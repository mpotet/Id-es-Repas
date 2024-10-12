import { Component, ElementRef, ViewChild } from '@angular/core';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent {
  @ViewChild('shoppingListTitle') shoppingListTitleElement!: ElementRef;
  
  nbMeals: number = 7;  // Nombre de jours par défaut
  generatedMeals: any[] = [];
  shoppingList: any[] = [];
  portions: number[] = [];  // Tableau pour stocker les portions par repas

  constructor(private mealService: MealService) {}

  // Générer la liste des repas aléatoirement
  generateMeals() {
    this.generatedMeals = this.mealService.generateRandomMeals(this.nbMeals);
    
    // Réinitialiser le tableau des portions
    this.portions = new Array(this.generatedMeals.length).fill(1); // Par défaut, 1 portion pour chaque repas
  }

  // Générer la liste de courses basée sur les repas et les portions
  generateShoppingList() {
    let shoppingList = new Map<string, number>();  // Utiliser une Map pour les quantités cumulées

    // Parcourir les repas générés
    this.generatedMeals.forEach((meal, index) => {
      const portions = this.portions[index]; // Obtenir les portions de chaque repas

      // Calculer les ingrédients pour chaque repas
      meal.ingredients.forEach((ingredient: any) => {
        const totalQuantity = (parseFloat(ingredient.quantity) * portions);
        const key = `${ingredient.name} : ${totalQuantity} ${ingredient.unit}`;

        if (shoppingList.has(key)) {
          shoppingList.set(key, shoppingList.get(key)! + totalQuantity);
        } else {
          shoppingList.set(key, totalQuantity);
        }
      });
    });

    // Convertir la Map en tableau pour affichage
    this.shoppingList = Array.from(shoppingList, ([name, quantity]) => ({ name, quantity }));

    setTimeout(() => {
      this.shoppingListTitleElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      
    }, 100);
  }
}
