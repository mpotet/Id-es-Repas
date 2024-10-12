import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Meal {
  name: string;
  tags: string[];
  ingredients: Ingredient[];
}

@Injectable({
  providedIn: 'root'
})
export class MealService {
  public meals: Meal[] = [];

  constructor(private http: HttpClient) {
    this.loadMeals();
  }

  // Charger les repas depuis le fichier JSON
  loadMeals(): void {
    this.http.get<Meal[]>('assets/meals.json').subscribe(
      (data) => {
        this.meals = data;
      },
      (error) => {
        console.error("Erreur lors du chargement des repas", error);
      }
    );
  }

  // Ajouter un nouveau repas
  addMeal(meal: Meal): void {
    this.meals.push(meal);
  }

  // Supprimer un repas
  removeMeal(mealName: string): void {
    this.meals = this.meals.filter(meal => meal.name !== mealName);
  }

  // Mettre à jour un repas
  updateMeal(updatedMeal: Meal): void {
    const index = this.meals.findIndex(meal => meal.name === updatedMeal.name);
    if (index !== -1) {
      this.meals[index] = updatedMeal;
    }
  }

  // Générer une liste de repas aléatoire pour un nombre de jours donné
  generateRandomMeals(days: number): Meal[] {
    let randomMeals: Meal[] = [];
    let usedTags: Set<string> = new Set<string>();

    // Si le nombre de repas disponibles est insuffisant
    if (this.meals.length < days) {
      console.error("Pas assez de repas disponibles pour générer la liste.");
      return [];
    }

    // Mélanger les repas pour une sélection aléatoire
    const shuffledMeals = [...this.meals].sort(() => Math.random() - 0.5);

    // Sélectionner des repas sans répéter les tags
    for (let meal of shuffledMeals) {
      if (!meal.tags.some(tag => usedTags.has(tag)) && randomMeals.length < days) {
        randomMeals.push(meal);
        meal.tags.forEach(tag => usedTags.add(tag));
      }
    }

    // Si on n'a pas pu sélectionner suffisamment de repas, renvoyer un tableau partiellement rempli
    if (randomMeals.length < days) {
      console.warn("Impossible de générer la liste complète avec des repas distincts.");
    }

    return randomMeals;
  }
}
