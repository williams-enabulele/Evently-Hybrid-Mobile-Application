import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, max, min } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AllService } from '../../_services/all.service';

@Component({
  selector: 'app-c-edit-channel',
  templateUrl: './c-edit-channel.component.html',
  styleUrls: ['./c-edit-channel.component.scss'],
})
export class CEditChannelComponent implements OnInit {

  editChannel: FormGroup;
  isPageScrolling = false;
  isAllowScrollEvents = false;
  isAllowScroll = true;
  records = [];
  scrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showAddBtn = false;
  showEditBtn = false;
  @Input() itemId: any;

  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public toast: ToastController,
    public all: AllService
  ) { }

  ngOnInit(
  ) {

    this.editChannel = this.fb.group({
      title: [''],
      description: [''],
      id: [''],
      uid: ['']
    });

    this.all.getChannelItem(this.itemId).subscribe(
      data => {
        this.records = data[0];
        console.log(this.records);
        
        this.editChannel = this.fb.group({
          title: ['' + this.records['title'] + ''],
          description: ['' + this.records['description'] + ''],
          id: ['' + this.itemId + '' ],
          uid: ['' + this.records['uid'] + '' ],
        });
        this.editChannel['title'] = 'gov';

      },
    );

  }

  onSubmit(){
    console.log(this.editChannel.value);
    this.all.putChannel(this.editChannel.value).subscribe(
      () => {
        this.onEditToast();
        this.dismiss();
      }
    );
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
  async onEditToast() {
    const toast = await this.toast.create({
      message: 'Channel successfully updated',
      duration: 2000
    });
    toast.present();
  }

}
