import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes',
  // old implementation of lazy loading.
  // loadChildren: './recipes/recipes.module#RecipesModule'
  // modern aprouch
  loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
},
  {path: 'shopping-list',
  // loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)

},
  {path: 'auth',
  loadChildren: () => import('./auth/auth.module'
  ).then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    // prealodingStrategy para o angular os modulos faltando do lazy loading no background.
    {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
