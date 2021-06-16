import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '@app/_services/auth.service';
import { AllService } from '@app/_services/all.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {

  recentChats = [];
  list = [];

  searchForm: FormGroup;
  public uid: any;
  public device: any;
  public people = [];

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private auth: AuthService,
    private all: AllService,
    private router: Router

  ) { }

  ngOnInit() {


    this.searchForm = this.fb.group ({
      search: [''],
    });

    const user = this.auth.decode();
    this.uid = user.uid;
    if (user.device !== null)
    {
      this.device = user.device;
    }

    if (localStorage.getItem('chats') !== null) {

      const data = localStorage.getItem('chats');
      this.recentChats = JSON.parse(data);

    }


    

  }


  addRecent(id){
    // console.log(id);
     this.all.getProfile(id).subscribe(
       profile => {
        console.log(profile);
        // this.recentChats.push(profile[0]);
        if (this.recentChats !== null){
 
           this.recentChats.forEach( (data, i) => {
             console.log(data.id);
             if (data.id === profile[0].id){
             console.log(i);
             this.recentChats.splice( i, 1 );
             }
           });
           this.recentChats.unshift(profile[0]);
           localStorage.setItem('chats', JSON.stringify(this.recentChats));
 
         }
         else {
           this.recentChats.push(profile[0]);
           console.log(this.recentChats);
         }
 
       }
     );
     this.router.navigate(['/chats', id]);
   }
  getPeopleList(){
    const value = this.searchForm.value.search;
    this.all.getPeople(value).subscribe(
      (people: any) => {
        this.people = people;
      }
    );
    console.log(this.searchForm.value);
    console.log(this.people);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
