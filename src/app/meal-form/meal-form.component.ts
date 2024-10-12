import { Component } from '@angular/core';
import { Meal, MealService } from '../meal.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent {
  meal: Meal = { name: '', tags: [], ingredients: [] };

  constructor(private mealService: MealService) {}

  addIngredient() {
    this.meal.ingredients.push({ name: '', quantity: 0, unit: '' });
  }

  saveMeal() {
    this.mealService.addMeal(this.meal);
    this.meal = { name: '', tags: [], ingredients: [] }; // Réinitialiser le formulaire
  }
}
