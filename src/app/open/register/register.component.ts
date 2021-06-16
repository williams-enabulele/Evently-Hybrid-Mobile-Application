import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, max, min } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AllService } from '@app/_services/all.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  matric = true;
  staffid = false;
  undergrad = false;
  uniqno: any;
  register: FormGroup;
  displayError = false;
  loading = false;
  isPageScrolling = false;
  isAllowScrollEvents = false;
  isAllowScroll = true;

  faculty = [];
  department = [];
  levels = [];
  scrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);
  backGroundImage: string;

  get su() { return this.register.controls; }



  show_matric() {
    this.staffid = false;
    this.undergrad = false;
    this.matric = true;
    this.su.staffid.disable();
    this.su.undergrad.disable();
    this.su.matric.enable();
  }

  show_staffid() {
    this.matric = false;
    this.undergrad = false;
    this.staffid = true;
    this.su.matric.disable();
    this.su.undergrad.disable();
    this.su.staffid.enable();

  }

  show_undergrad(){
    this.matric = false;
    this.staffid = false;
    this.undergrad = true;
    this.su.staffid.disable();
    this.su.matric.disable();
    this.su.undergrad.enable();

  }


  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public toast: ToastController,
    private all : AllService
  ) { 
    this.backGroundImage = "../../assets/unical-gate.jpg";
  }

 

  ngOnInit() {

    

    this.all.getFaculty().subscribe(
      data => {
        this.faculty = data.results.data;
        // console.log(data.results.data);
      }
    )

    this.all.getDepartment().subscribe(
      data => {
        this.department = data.results.data;
        // console.log(data);
      }
    )

    this.all.getLevels().subscribe(
      data => {
        this.levels = data.results.data;
        // console.log(data.results.data);
      }
    )

    this.uniqno = Math.floor( 100000 + Math.random() * 900000 );
    // console.log(this.uniqno);
    this.matric = true;
    this.register = this.fb.group({

      fullname: ['', [Validators.required, Validators.minLength(3)]],
      faculty: [''],
      dept: [''],
      uniqno: ['' + this.uniqno + ''],
      levels: [''],
      matric: ['', [Validators.required, Validators.maxLength(14), Validators.pattern(/^[a-zA-Z]{3}[/]{1}[a-zA-Z]{3}[/]{1}[0-9]{2}[/]{1}[0-9]{3}/)]],
      staffid: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(/^[a-zA-Z]{1}[0-9]{2}[/]{1}[0-9]{4}/)]],
      undergrad: ['', [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]{2}[/]{1}[0-9]{9}/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]]
    });
    this.su.staffid.disable();



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
  async success() {
    const toast = await this.toast.create({
      message: 'Account successfully created, login! ',
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

  onRegister() {

    // console.log(this.register.value);
    // console.log(this.register.value);
    this.loading = true;
    this.auth.register(this.register.value)
      .pipe(first())
      .subscribe({
        complete: () => {
          // console.log(this.register.value);
          // this.loading = false;
          this.success();
          this.router.navigate(['/login']);
          // this.router.navigate(['/auth/account-activation']);
        },
        error: () => {
         this.error();
        },
        next: () => {
        }
  });
}



}
