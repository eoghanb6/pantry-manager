import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'ingredients',
    loadChildren: () => import('./Ingredients/ingredients.module').then(m => m.IngredientsPageModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./Recipes/recipes.module').then(m => m.RecipesPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./Account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./ForgotPassword/forgotpassword.module').then(m => m.ForgotPasswordPageModule)
  },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
]
;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
