import { Component, ViewChild } from '@angular/core';
import {ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  
  
  constructor(
    public toast: ToastController
  ) {
    // this.routerOutlet.canGoBack();
  }
}
