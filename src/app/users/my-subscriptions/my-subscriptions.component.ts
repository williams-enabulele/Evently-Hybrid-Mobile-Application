import { PublicProfileComponent } from './../public-profile/public-profile.component';
import { Component, OnInit } from '@angular/core';
import { AllService } from '@app/_services/all.service';
import { AuthService } from '@app/_services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss'],
})
export class MySubscriptionsComponent implements OnInit {

  datas = [];
  user_id: any;

  constructor(
    public modalCtrl : ModalController,
    private all: AllService,
    private auth: AuthService
  ) { }

    // Channels Modal
    async publicProfileModal(id) {
      console.log(id);
      const modal = await this.modalCtrl.create({
        component: PublicProfileComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          c_uid: id
        }
      });
      modal.onDidDismiss().then(() => {
          // this.reload();
          this.toggleMenu();
     });
      return await modal.present();
    }
  toggleMenu() {
    throw new Error('Method not implemented.');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  ngOnInit() {

    const token = this.auth.decode();
    const uid = token.uid;
    this.user_id = uid;

    this.loadSubscriptions(uid);


 
  }

  loadSubscriptions(uid){
    this.all.mySubscriptions(1).subscribe(
      (data: any) => {

        this.datas = data;
      }
    )
  }

  unSubscribe(id){
    console.log(id);
    this.all.unsubscribe(id).subscribe(
      data => {
        this.loadSubscriptions(this.user_id);
      }
    )
  }
}
