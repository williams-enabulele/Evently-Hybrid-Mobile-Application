
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';
import { ProfileService } from './../../_services/profile.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AllService } from '@app/_services/all.service';
import { RootingListComponent } from './../rooting-list/rooting-list.component';
import { RootersListComponent } from './../rooters-list/rooters-list.component';
import { ProfileEditComponent } from './../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  uid: any;

  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private profileService: ProfileService,
    private all: AllService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) { }

  records = [];
  count = [];


  ngOnInit() {

    const token = this.auth.decode();
    const uid = token.uid;
    this.uid = uid;

    this.all.getCounts(uid).subscribe(
      data => {
        console.log(data);
        this.count = data[0];
      }
    )

    this.profileService.getProfile(uid).subscribe( data => {
      this.records = data[0];
    })
}
  

async followersModal(){
  const modal = await this.modalController.create({
    component: RootersListComponent,
  });
  modal.onDidDismiss().then(() => {
    //this.toggleMenu();
  });
  return await modal.present();
}

async followingModal(){
  const modal = await this.modalController.create({
    component: RootingListComponent,
  });
  modal.onDidDismiss().then(() => {
    //this.toggleMenu();
  });
  return await modal.present();
}
async editProfileModal(){
  const modal = await this.modalController.create({
    component: ProfileEditComponent,
  });
  modal.onDidDismiss().then(() => {
    //this.toggleMenu();
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
 editProfile(id){
   console.log('edited');
 }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'My Profile',
      
      buttons: [{
        text: 'Edit',
        role: 'destructive',
        icon: 'pencil',
        handler: () => {
          this.editProfileModal();
        }
      
      }],
      
      
    });
    await actionSheet.present();
  }
 

}
