import { PeopleComponent } from './users/people/people.component';
import { SubscribeComponent } from './user/subscribe/subscribe.component';
import { ForgotComponent } from './open/forgot/forgot.component';
import { WelcomeComponent } from './open/welcome/welcome.component';
import { OnboardingComponent } from './open/onboarding/onboarding.component';
import { FrontComponent } from './front/front.component';
import { SuccessComponent } from './open/success/success.component';
import { ResetComponent } from './open/reset/reset.component';
import { RegisterComponent } from './open/register/register.component';
import { LoginComponent } from './open/login/login.component';


// import { ProfileComponent } from './users/profile/profile.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
export  async function tokenGetter() {
  return localStorage.getItem('token');
}
import { UserModule } from './users/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { MenuPage } from './menu/menu.page';
import { TokeninterceptorService } from './_services/token-interceptor.service';
import { UsersComponent } from './users/users.component';
import { AvatarModule } from 'ngx-avatar';





@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    OnboardingComponent,
    WelcomeComponent,
    MenuPage,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    ForgotComponent,
    ResetComponent,
    SuccessComponent,
    SubscribeComponent,
    PeopleComponent
   // ProfileComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
         tokenGetter,
         allowedDomains: ['localhost:8100', 'localhost:8000', 'evently.thesimpleagenda.com'],
         disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
   })

  ],
  providers: [
  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
