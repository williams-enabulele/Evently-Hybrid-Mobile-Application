import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, max, min } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AllService } from '../../_services/all.service';

@Component({
  selector: 'app-c-channel',
  templateUrl: './c-add-channel.component.html',
  styleUrls: ['./c-add-channel.component.scss'],
})
export class CAddChannelComponent implements OnInit {

  addChannel: FormGroup;

  isPageScrolling = false;
  isAllowScrollEvents = false;
  isAllowScroll = true;
  records = [];
  scrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showAddBtn = false;
  showEditBtn = false;

  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public toast: ToastController,
    public channel: AllService
  ) { }

  ngOnInit(
  ) {

      const user = this.auth.decode();

      this.addChannel = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      uid: ['' + user.uid + '' ]
    });
  }

  onSubmit(){
    console.log(this.addChannel.value);
    this.channel.postChannel(this.addChannel.value).subscribe(
      () => {
        this.presentToast();
        this.dismiss();
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
  logScrollStart() {
    this.scrolling.next(true);
  }

  /**
   * Content scrolling
   */
  logScrolling(event) {
    // console.log('Scrolling');
  }

  /**
   * Content scroll end
   */
  logScrollEnd() {
    this.scrolling.next(false);
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Channel successfully created',
      duration: 2000
    });
    toast.present();
  }

}
