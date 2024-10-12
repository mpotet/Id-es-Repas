import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Route de l'accueil
  { path: 'meal-planner', component: MealPlannerComponent }, // Route du planner
  { path: 'meal-list', component: MealListComponent }, // Route de la liste des repas
  { path: '**', redirectTo: '' } // Redirection vers l'accueil en cas de route non trouvée
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
