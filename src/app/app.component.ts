import { PushNotificationsService } from './_services/push-notifications.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/core';
import { ToastController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platForm: Platform,
    public toast: ToastController,
    private router: Router,
    private push: PushNotificationsService
  ) {
    // this.routerOutlet.canGoBack();
    this.initializeApp();
  }

 

  initializeApp(){
    this.platForm.ready().then(()  => {
      SplashScreen.hide();
      this.router.navigateByUrl('onboarding');
      this.push.initPush();
    }
    )
  }
}
