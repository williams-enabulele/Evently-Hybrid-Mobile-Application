import { PeopleComponent } from './../people/people.component';
import { Component, OnInit } from '@angular/core';
import {  NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '@app/_services/auth.service';
import { AllService } from '@app/_services/all.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m-chatlist',
  templateUrl: './m-chat-list.component.html',
  styleUrls: ['./m-chat-list.component.scss'],
  providers: [NavParams]
})
export class MChatListComponent implements OnInit {

  recentChats = [];
  list = [];

  uid: any;
  messages = [];
  users: any = [{
    userID: '',
    uid: ''
  }];

  constructor(

    private auth: AuthService,
    private all: AllService,
    private router: Router,
    private modalController: ModalController
    // public navCtrl: NavController,
    /* public cs: ContactsService,
    private socket: Socket */
  ) { }

  ngOnInit() {

    // this.cs.contacts;
    const token = this.auth.decode();
    const uid = token.uid;
    if (localStorage.getItem('chats') !== null) {

      const data = localStorage.getItem('chats');
      this.recentChats = JSON.parse(data);

    }


    this.all.getChatlist(uid).subscribe(
      data => {

        this.list = data.results.data;
        console.log(this.recentChats);

      }
    );

  }

  async chatListModal() {
    const modal = await this.modalController.create({
      component: PeopleComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  addRecent(id){
   // console.log(id);
    this.all.getProfile(id).subscribe(
      profile => {
       // console.log(profile);
       // this.recentChats.push(profile[0]);
       if (this.recentChats !== null){

          this.recentChats.forEach( (data, i) => {
            // console.log(data.id);
            if (data.id === profile[0].id){
            // console.log(i);
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

}
