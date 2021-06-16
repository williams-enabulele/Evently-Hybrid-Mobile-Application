import { SuccessComponent } from './../success/success.component';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../_services/auth.service';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  backgroundImage: any;
  resetForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toast: ToastController,
    private auth: AuthService,
  ) {
  this.backgroundImage = "../../assets/img/bg.jpeg";

   }

  ngOnInit() {

    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.resetForm = this.fb.group({
      password: ['', Validators.required]
    })

  }


  checkMail(){
    // console.log(this.loginForm.value);
     this.auth.checkMail(this.forgotForm.value).subscribe(
       response => {
         this.success();
       },
       error => {
         this.error();
       }
     );
   }


   
  resetPassword(){
    // console.log(this.loginForm.value);
     this.auth.reset(this.resetForm.value).subscribe(
       response => {
         this.success();
       },
       error => {
         this.error();
       }
     );
   }

  async success() {
    const toast = await this.toast.create({
      message: 'You\'ve successfully logged in! ',
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
