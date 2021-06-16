import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AllService } from '@app/_services/all.service';
import { AuthService } from '@app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-s-add-schedule',
  templateUrl: './s-add-schedule.component.html',
  styleUrls: ['./s-add-schedule.component.scss'],
})
export class SAddScheduleComponent implements OnInit {

  schedule: FormGroup;
  url: any;
  words: any;
  wordCount: any;
  file: any;
  formData: any;
  records = [];
  colors=['red','blue','green'];
  materials: any;
  randomItem: string;

  constructor(
    public modalController: ModalController,
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public toast: ToastController,
    public channel: AllService
  ) { }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];
      this.schedule.get('img').setValue(file);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (event.target as FileReader).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get su() { return this.schedule.controls; }

  ngOnInit() {
    const user = this.auth.decode();
    this.channel.getChannelUser(user.uid).subscribe(
      data => {
        this.records = data;

      },
    );

    this.schedule = this.fb.group({
      title: ['', [Validators.required]],
      post: ['', [Validators.required, Validators.minLength(10)]],
      comments: [true, [Validators.required]],
      channel_id: [''],
      img: [''],
      uid: ['' + user.uid + ''],
      datetime: ['', [Validators.required]]

    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Broadcast successfully created',
      duration: 2000
    });
    toast.present();
  }
  onSubmit(){

    console.log(this.schedule.value);

    console.log(this.formData);

    this.channel.postScheduleBroadcast(
      this.schedule.get('img').value,
      this.schedule.value.title,
      this.schedule.value.post,
      this.schedule.value.comments,
      this.schedule.value.channel_id,
      this.schedule.value.datetime,
      this.schedule.value.uid
    ).subscribe(
      () => {
        this.presentToast();
      }
    );
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }


}
