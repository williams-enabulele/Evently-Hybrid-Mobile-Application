import { AuthService } from './../../_services/auth.service';
import { Component, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
// import { Observable} from 'rxjs';
import {Ionic4EmojiPickerComponent} from 'ionic4-emoji-picker'; 
// import { Socket } from 'ngx-socket-io';
import { NavController, NavParams  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AllService } from '@app/_services/all.service';

@Component({
  selector: 'app-m-chats',
  templateUrl: './m-chats.component.html',
  styleUrls: ['./m-chats.component.scss'],
  providers: [NavParams]
})
export class MChatsComponent implements OnInit {

  fromSelf = true;
  // Messages = [];
  selectedUser: any;
  messages = [];
  replies = [];
  message = '';
  picMsg = '';
  fileMsg = '';
  uniqno: any;
 


  userId: any;
  text: string;
  picture: any;
  file: any;


  constructor(
    public modalCtrl : ModalController,
    private navCtrl : NavController,
    private navParams: NavParams,
    private toastCtrl : ToastController,
    private route: ActivatedRoute,
    private all: AllService,
    private auth: AuthService,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {

    const token = this.auth.decode();
    this.userId = token.uid;
    this.selectedUser = this.route.snapshot.paramMap.get('id');
    this.text = '';
    this.picture = false;
    this.file = false;
    this.loadMessages();
  }
  // SocketIO Communications
  sendMessage(data){
    if(data = null){
      return
    }  else {

      this.all.sendMessage(data).subscribe(
        data => {
          this.loadMessages();
          console.log(data);
        }
      )

    }
   
  }
 loadMessages (){

  // this.uniqno = this.userId + this.selectedUser;
  this.all.messageList(this.userId, this.selectedUser).subscribe(
    data => {
      this.messages = data;
    }
  )
 }

 // Send chats
  onMessage() {

  if (this.message === ''){
    return
  } 
  else {
    const data = {
      receiver: this.selectedUser,
      message: this.message,
      sender: this.userId
      }
    this.all.sendMessage(data).subscribe(
          data => {
            this.message = '';
            this.loadMessages();
            console.log(data);
          }
        );
  }
 
  }
 


ionViewWillLeave(){
 // this.socket.disconnect();
}

showToast(msg){
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.finally();
}


  sendPicture(){}

  async openEmojiPicker() {

    const modal = await this.modalCtrl.create(
      {
        component: Ionic4EmojiPickerComponent,
        showBackdrop: true,
        componentProps:
        {
          isInModal: true
        }
      });

    modal.present();

      // Listen to emoji select event emmited from the modal
    modal.onDidDismiss().then(event =>
        {
          console.log('Got Data From Emoji Picker', event);
          if (event !== undefined && event.data !== undefined)
          {
            this.message += event.data; // Add emoji to the yourMessage string
          }
        });
  }
  showEmojiPicker: boolean = false;
  addEmoji(event) { this.message = this.message + event.data;
 }


deleteMsg(id){
  console.log('deleted');
}

 async presentActionSheet(id) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Chats',

    buttons: [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.deleteMsg(id);
      }
    
    }],
    
  });
  await actionSheet.present();
}


}
