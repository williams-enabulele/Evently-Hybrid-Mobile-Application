import { ForgotComponent } from './open/forgot/forgot.component';
import { OnboardingComponent } from './open/onboarding/onboarding.component';
import { LoginComponent } from './open/login/login.component';
import { FrontComponent } from './front/front.component';
import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './open/register/register.component';
import { ResetComponent } from './open/reset/reset.component';



const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: OnboardingComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset', component: ResetComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: ForgotComponent}


    ]
  },

  {
    path: 'users',
    loadChildren: () => import('./users/user.module').then( m => m.UserModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
