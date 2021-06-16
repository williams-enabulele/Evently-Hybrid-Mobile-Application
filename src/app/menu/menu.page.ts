import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { MenuController, ModalController } from '@ionic/angular';
import { ProfileService } from './../_services/profile.service';
import { ProfileComponent } from './../users/profile/profile.component';
import { ProfileEditComponent } from './../users/profile-edit/profile-edit.component';
import { AboutComponent } from './../users/about/about.component';
import { MySubscriptionsComponent } from './../users/my-subscriptions/my-subscriptions.component';
import { SubscribeComponent } from '@app/user/subscribe/subscribe.component';





@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  /* public appPages = [
    { title: 'My Profile', icon: 'person',  },
    { title: 'My Channels', icon: 'paper-plane',  callFunction: '' },
    { title: 'My subscriptions',  icon: 'heart',  callFunction: '' },
    { title: 'Schedule Broadcast', icon: 'today',  callFunction: '' },
    { title: 'About',  icon: 'information-circle',  callFunction: '' }
  ]; */

  records = [];
  name: any;

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    private profileService: ProfileService,
    public modalController: ModalController,
  ) {}
  ngOnInit() {
    const token = this.auth.decode();
    const uid = token.uid;

    this.profileService.getProfile(uid).subscribe( data => {
      this.records = data[0];
      localStorage.setItem('fullname', this.records['fullname']);
      // console.log(data);
    });
  }

    // Channels Modal
    async profileModal() {
      console.log('clicked');
      const modal = await this.modalController.create({
        component: ProfileComponent,
        cssClass: 'my-custom-class',
      });
      modal.onDidDismiss().then(() => {
          // this.reload();
          this.toggleMenu();
     });
      return await modal.present();
    }

    async profileEditModal(){
      const modal = await this.modalController.create({
        component: ProfileEditComponent,
      });
      modal.onDidDismiss().then(() => {
        this.toggleMenu();
      });
      return await modal.present();
    }

    async aboutModal(){
      const modal = await this.modalController.create({
        component: AboutComponent,
      });
      modal.onDidDismiss().then(() => {
        this.toggleMenu();
      });
      return await modal.present();
    }

    async subscriptionModal(){
      const modal = await this.modalController.create({
        component: MySubscriptionsComponent,
      });
      modal.onDidDismiss().then(() => {
        this.toggleMenu();
      });
      return await modal.present();
    }
  logout(){
    this.auth.logout();
  }

  toggleMenu() {
    this.menu.toggle();
  }



   // Subscribe Modal
   async subscribeModal() {
    console.log('clicked');
    const modal = await this.modalController.create({
      component: SubscribeComponent,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss().then(() => {
        // this.reload();
        this.toggleMenu();
   });
    return await modal.present();
  }


}
