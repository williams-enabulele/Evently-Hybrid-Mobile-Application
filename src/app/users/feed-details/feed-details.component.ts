import { CommentsComponent } from './../comments/comments.component';
import { AuthService } from '@app/_services/auth.service';
import { AllService } from './../../_services/all.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss'],
})
export class FeedDetailsComponent implements OnInit {
  data = [];
  @Input() id: any;
  comments = [];
  commentForm: FormGroup;
  user: any;
  channelId: any;

  constructor(
    public modalCtrl: ModalController,
    private route: ActivatedRoute,
    private all: AllService,
    private fb: FormBuilder,
    private auth: AuthService,
    public modalController: ModalController
    
  ) { }

 
  ngOnInit() {

    const user = this.auth.decode();
    this.user = user.uid;

    this.all.getFeedDetails(this.id).subscribe(
      records => {
        console.log(records[0]);
        this.data = records[0];
        this.channelId = this.data['channel_id'];
      }
    )

    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      user_id: ['' + this.user + ''],
      channel_id: ['' + this.id + ''],
    });

    console.log(this.id);

  }

   // Channels Modal
   async commentsModal(id) {
    const modal = await this.modalController.create({
      component: CommentsComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id: id
      }
    });
    modal.onDidDismiss().then(() => {

   });
    return await modal.present();
  }
  viewComments(id){
    console.log(id);
    this.all.viewComments(id).subscribe(
      comments => {
        this.comments = comments[0];
      }
    )
  }

  addComment(){

    console.log(this.commentForm.value);

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
