import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../_services/auth.service';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  item: any;
  firstname: any;
  fullname: any;
  
  isAllowScroll = true;
  backGroundImage: any;

  constructor(
    private fb: FormBuilder,
    private toast: ToastController,
    private auth: AuthService,
    // private platform: Platform,
    // private routerOutlet: IonRouterOutlet
  ) {
   /*  this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()){
        App.exitApp();
      }
    }) */

    this.backGroundImage = "../../assets/img/bg.jpeg";
  }

  ngOnInit() {
    
    if( null !== localStorage.getItem('fullname')){
      this.fullname = localStorage.getItem('fullname');
      this.firstname = this.fullname.replace(/ .*/, '');
    }


    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


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

  onSubmit(){
   // console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      response => {
        this.success();
        this.auth.setUser(response);
      },
      error => {
        this.error();
      }
    )
  }

}
