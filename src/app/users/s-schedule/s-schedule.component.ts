import { SAddScheduleComponent } from './../s-add-schedule/s-add-schedule.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { AllService } from '@app/_services/all.service';
import { AuthService } from '@app/_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-s-schedule',
  templateUrl: './s-schedule.component.html',
  styleUrls: ['./s-schedule.component.scss'],
})
export class SScheduleComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public toast: ToastController,
    public channel: AllService,
    private all: AllService,
    public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController,
  ) { }

  get su() { return this.schedule.controls; }

  schedule: FormGroup;
  url: any;
  words: any;
  wordCount: any;
  data = [];
  file: any;
  formData: any;
  records = [];
  colors = ['red', 'blue', 'green'];
  materials: any;
  randomItem: string;
  slideOpts = {

     slidesPerView: 1.5
  };

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

 
  ngOnInit() {

    const user = this.auth.decode();
    this.all.getScheduleUser(user.uid).subscribe(
      data => {

          this.data = data;
         // console.log(this.data);
      }
    )

    this.schedule = this.fb.group({
      title: ['', [Validators.required]],
      post: ['', [Validators.required]],
      comments: [true, [Validators.required]],
      channel_id: [''],
      img: [''],
      uid: ['' + user.uid + ''],
      datetime: ['']

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

    // console.log(this.formData);

    this.all.postScheduleBroadcast(
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

  deleteSchedule(id){
    console.log('deleted');
  }

  editSchedule(id){
    console.log('edited');
  }

  async scheduleModal() {
    const modal = await this.modalController.create({
      component: SAddScheduleComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentActionSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Schedule',
      
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteSchedule(id);
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.editSchedule(id);
        }
      }],
      
    });
    await actionSheet.present();
  }


}
