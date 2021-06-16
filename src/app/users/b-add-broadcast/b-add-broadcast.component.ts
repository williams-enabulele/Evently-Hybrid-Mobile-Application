import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, max, min } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AllService } from '../../_services/all.service';

@Component({
  selector: 'app-b-add-broadcast',
  templateUrl: './b-add-broadcast.component.html',
  styleUrls: ['./b-add-broadcast.component.scss'],
})
export class BAddBroadcastComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public toast: ToastController,
    public channel: AllService
  ) { }

  addBroadcast: FormGroup;
  isPageScrolling = false;
  isAllowScrollEvents = false;
  isAllowScroll = true;
  records = [];
  scrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showAddBtn = false;
  showEditBtn = false;
  clickedImage = false;
  url: any;
  words: any;
  wordCount: any;
  file: any;

  @ViewChild('text')text: ElementRef;

  formData: FormData;



  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];
      this.addBroadcast.get('img').setValue(file);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (event.target as FileReader).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }



  ngOnInit() {
    const user = this.auth.decode();
    this.channel.getChannelUser(user.uid).subscribe(
      data => {
        this.records = data;

      },
    );

    this.addBroadcast = this.fb.group({
    title: ['', [Validators.required]],
    post: ['', [Validators.required, Validators.minLength(10)]],
    comments: [true, [Validators.required]],
    channel_id: [''],
    img: [''],
    uid: ['' + user.uid + '']
  });
  }

  onSubmit(){

    console.log(this.addBroadcast.value);

    // console.log(this.formData);

    this.channel.postBroadcast(
      this.addBroadcast.get('img').value,
      this.addBroadcast.value.title,
      this.addBroadcast.value.post,
      this.addBroadcast.value.comments,
      this.addBroadcast.value.channel_id,
      this.addBroadcast.value.uid
    ).subscribe(
      () => {
        this.presentToast();
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
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Broadcast successfully created',
      duration: 2000
    });
    toast.present();
  }

}
