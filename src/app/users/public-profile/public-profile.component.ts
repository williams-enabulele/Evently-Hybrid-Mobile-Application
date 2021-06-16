import { PushNotificationsService } from './../../_services/push-notifications.service';
import { Component, Input, OnInit } from '@angular/core';
import { AllService } from '@app/_services/all.service';
import { AuthService } from '@app/_services/auth.service';
import { ProfileService } from '@app/_services/profile.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  @Input() c_uid: any;
  records = [];
  counts = [];
  channels = [];
  channelArr = [];
  summedArr = [];
  subdata = {};
  uid: any;
  subscribers = [];
  subBtn = true;
  unSubBtn = false;
  push_token: any
  fullname: string;
  firstname: any;
  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private profileService: ProfileService,
    private all: AllService,
    private toast: ToastController,
    private push: PushNotificationsService
  ) { }

  ngOnInit() {

    const token = this.auth.decode();
    this.uid = token.uid;
    this.push_token = token.device;
    console.log(this.uid);

    this.all.getCounts(this.c_uid).subscribe(
      data => {
        console.log(data);
        console.log(this.c_uid);
        this.counts = data[0];
      }
    )

   
    this.getUser();
   

  /*   const token = this.auth.decode();
    const uid = token.uid; */
   // console.log(this.c_uid);
    this.profileService.getProfile(this.c_uid).subscribe( data => {
      this.records = data[0];
      console.log(this.records);
      this.fullname = this.records['fullname'];
      this.firstname = this.fullname.replace(/ .*/,'');
    })
  }

  getUser(){
    this.all.getChannelUser(this.c_uid).subscribe(
      data => {
        this.channels = data;
        console.log(this.channels);
        for (let i = 0; i < this.channels.length; i++ ){
          this.all.getSubscribers(this.channels[i]['id']).subscribe(
            data => {
              this.subscribers = data;
              console.log(this.channels[i]['id']);
              console.log(this.subscribers);
              this.summedArr.push(this.subscribers[i]);

            }
          )
      };
        console.log(this.summedArr);

    });
  }
  subscribe(id){
    const token = this.auth.decode();
    const device = token.device;

    if ( null !== device){
      this.subdata = { push_token: device, uid: this.uid, channel_id: id };
      this.all.subscribe(this.subdata).subscribe(
        data => {
          console.log(data);
          this.success();
          this.getUser();
        }
      )
    }
    else {
      this.push.registerPush();
      this.subdata = { push_token: device, uid: this.uid, channel_id: id };
      this.all.push(this.subdata).subscribe(
        data => {
          console.log(data);        }
      )
    }
  }

  swapBtn(){

    if(this.subBtn === true){
      this.unSubBtn = false;
    }
    else if (this.unSubBtn === true) {

      this.subBtn = false;
      
    }

  }

  unSubscribe(){
    this.all.unsubscribe(this.push_token).subscribe(
      data => {
        console.log(data);
        console.log('unsubscribed');
        this.getUser();
        this.success();
      }
    )
    
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }


  async success() {
    const toast = await this.toast.create({
      message: 'You\'ve successfully subscribed to channel ',
      duration: 2000
    });
    toast.present();
  }
  async error() {
    const toast = await this.toast.create({
      message: 'Oops! something went wrong, try again!',
      duration: 2000
    });
    toast.present();
  }


}
