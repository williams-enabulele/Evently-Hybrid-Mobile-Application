import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
import { CEditChannelComponent } from './../c-edit-channel/c-edit-channel.component';
import { CAddChannelComponent } from './../c-add-channel/c-add-channel.component';
import { AuthService } from './../../_services/auth.service';
import { AllService } from './../../_services/all.service';
import { ModalController, ToastController, createAnimation, Animation, AnimationController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-c-channels',
  templateUrl: './c-channels.component.html',
  styleUrls: ['./c-channels.component.scss'],
})
export class CChannelsComponent implements OnInit {

  // Declare variables
  item: any;
  records = [];
  showLoading = false;
  animationCtrl = new AnimationController();
  list: any;
  color = '#';
  letters = '0123456789ABCDEF';


  constructor(
    private jwtHelper: JwtHelperService,
    public modalController: ModalController,
    private all: AllService,
    private auth: AuthService,
    public toast: ToastController,
    public actionSheetController: ActionSheetController

  ) { }


  ngOnInit() {

    this.showLoading = true;
    const user = this.auth.decode();
    this.all.getChannelUser(user.uid).subscribe(
      data => {
        this.records = data;
        this.showLoading = false;
        // console.log(this.records);

      },
    );
  }
  
  // Method
  ionViewWillEnter(){
    this.reload();
  }

  //  Edit Modal
  async editChannelModal(itemId) {
    const modal = await this.modalController.create({
      component: CEditChannelComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        itemId
      }
    });
    modal.onDidDismiss().then(() => {
        this.reload();
   });
    return await modal.present();
  }

  // Channels Modal
  async channelsModal() {
    const modal = await this.modalController.create({
      component: CAddChannelComponent,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss().then(() => {
        this.reload();
   });
    return await modal.present();
  }


  // Delete Channel Method
  deleteChannel(id){

    this.all.deleteChannel(id).subscribe(
      data => {
        this.reload();
        this.onDeleteToast();
      }
    )
  }

  // Reload Page on Edit or Delete Method
  reload(){
    const user = this.auth.decode();
    this.all.getChannelUser(user.uid).subscribe(
      data => {
        this.records = data;
      },
    );
  }


// Toast Method on Delete
  async onDeleteToast() {
    const toast = await this.toast.create({
      message: 'Channel successfully deleted',
      duration: 2000
    });
    toast.present();
  }

  // Initialize App
  async presentActionSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Channels',
      
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteChannel(id);
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.editChannelModal(id);
        }
      }],
      
    });
    await actionSheet.present();
  }

}


