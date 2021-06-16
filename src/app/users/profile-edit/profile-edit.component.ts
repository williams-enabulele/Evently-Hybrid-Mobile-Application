import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AllService } from '@app/_services/all.service';
import { AuthService } from '@app/_services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '@app/_services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {


  profileEdit: FormGroup;
  url: any;
  words: any;
  wordCount: any;
  file: any;
  userProfile = [];
  formData: any;
  records = [];
  colors=['red','blue','green'];
  materials: any;
  randomItem: string;
  levels = [];

  constructor(
    public modalController: ModalController,
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public toast: ToastController,
    public channel: AllService,
    private profile: ProfileService
  ) { }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];
      this.profileEdit.get('img').setValue(file);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (event.target as FileReader).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get su() { return this.profileEdit.controls; }

  ngOnInit() {
    const user = this.auth.decode();

    this.profile.getProfile(user.uid).subscribe (
      data => {
        this.userProfile = data[0];
        //console.log(this.userProfile);
        this.profileEdit.controls.fullname.disable();
        this.profileEdit.controls.faculty.disable();
        this.profileEdit.controls.department.disable();
        
      }
    )
  
    this.channel.getChannelUser(user.uid).subscribe(
      data => {
        this.records = data;

      },
    );

    this.profileEdit = this.fb.group({
      bio: [''],
      fullname: [''],
      faculty: [''],
      department: [''],
      levels: [''],
      img: [''],
      uid: ['' + user.uid + '']

    });

    this.channel.getLevels().subscribe(
      data => {
        this.levels = data.results.data;
        console.log(data.results.data);
        
      }
    )
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Broadcast successfully created',
      duration: 2000
    });
    toast.present();
  }
  onSubmit(){

    console.log(this.profileEdit.value);

    console.log(this.formData);

    this.channel.postBroadcast(
      this.profileEdit.get('img').value,
      this.profileEdit.value.title,
      this.profileEdit.value.post,
      this.profileEdit.value.comments,
      this.profileEdit.value.channel_id,
      this.profileEdit.value.uid
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
