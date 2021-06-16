import { AuthService } from '@app/_services/auth.service';
import { AllService } from '@app/_services/all.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PushNotificationsService } from '@app/_services/push-notifications.service';



@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {

  searchForm: FormGroup;
  channels = [];
  uid: any;
  device: any;

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private all: AllService,
    private auth: AuthService,
    public toast: ToastController,
    private push: PushNotificationsService

  ) { }

  ngOnInit() {

    const user = this.auth.decode();
    this.uid = user.uid;
    if ( user.device !== null )
    {
      this.device = user.device;
    }

    this.searchForm = this.fb.group ({
      search: [''],
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


  getChannelList(){
    const value = this.searchForm.value.search;
    this.all.getChannelList(value, this.uid).subscribe(
      (channels: any) => {
        this.channels = channels;
      }
    );
    console.log(this.searchForm.value);
    console.log(this.channels);
  }

  subscribe(id){

    const user = this.auth.decode();

    if (user.device !== null) {

      const data = {
        device: user.device,
        uid: this.uid,
        channel_id: id
      }

      // console.log(data);
      this.all.subscribe(data).subscribe(
       result => {
         console.log(result);
         this.success();
       }
     )

    }

    else {

    // Used the FCM Service to register the user's device token  
    this.push.initPush();

    const deviceToken = localStorage.getItem('device_token');
    const data  = {
      device: deviceToken,
      uid: this.uid,
      channel_id: id
    }

    this.all.subscribe(data).subscribe(
      result => {
        console.log(result);
        this.success();
      }
    )

    }

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
