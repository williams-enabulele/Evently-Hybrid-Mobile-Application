import { PublicProfileComponent } from './../public-profile/public-profile.component';
import { AuthService } from '@app/_services/auth.service';
import { AllService } from '@app/_services/all.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooters-list',
  templateUrl: './rooters-list.component.html',
  styleUrls: ['./rooters-list.component.scss'],
})
export class RootersListComponent implements OnInit {

  datas = [];

  constructor(
    public modalCtrl: ModalController,
    private all: AllService,
    private auth: AuthService,
  ) { }

  ngOnInit() {

    const token = this.auth.decode();
    const uid = token.uid;

    this.all.getFollowersList(uid).subscribe(
      data => {
        this.datas = data;
        console.log(this.datas);

      }
    )
  }

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
       //  this.toggleMenu();
   });
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
