import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AllService } from '@app/_services/all.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { BAddBroadcastComponent } from './../b-add-broadcast/b-add-broadcast.component';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-b-broadcast',
  templateUrl: './b-broadcast.component.html',
  styleUrls: ['./b-broadcast.component.scss'],
})
export class BBroadcastComponent implements OnInit {
  data = [];
  @Output() callback = new EventEmitter;



  constructor(
    public modalController: ModalController,
    private all: AllService,
    private auth: AuthService,
    public actionSheetController: ActionSheetController
  ) { }

    slideOpts = {

     slidesPerView: 1.5
  };


  ngOnInit() {
    const user = this.auth.decode();
    this.all.getBroadcastUser(user.uid).subscribe(
      data => {

          this.data = data;
          console.log(this.data);
      }
    )
  }

  async broadcastModal() {
    const modal = await this.modalController.create({
      component: BAddBroadcastComponent,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then(() => {
     this.reload();
 });
    return await modal.present();
  }

  reload(){
    const user = this.auth.decode();
    this.all.getBroadcastUser(user.uid).subscribe(
     data => {
       this.data = data;

     }
   );
  }

deleteBroadcast(id){
  console.log('deleted')
}
  async presentActionSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Broadcast',

      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteBroadcast(id);
        }
      }
      ],

    });
    await actionSheet.present();
  }

}

