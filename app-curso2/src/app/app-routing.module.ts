import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes',
  // old implementation of lazy loading.
  // loadChildren: './recipes/recipes.module#RecipesModule',
  // modern aprouch
  loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
