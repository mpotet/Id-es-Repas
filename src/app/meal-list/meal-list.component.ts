import { Component } from '@angular/core';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent{

  constructor(public mealService: MealService) {
  }

  deleteMeal(mealName: string): void {
    this.mealService.removeMeal(mealName);
  }
}
