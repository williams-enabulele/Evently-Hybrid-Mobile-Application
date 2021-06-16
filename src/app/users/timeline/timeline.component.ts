import { FeedDetailsComponent } from './../feed-details/feed-details.component';
import { AllService } from '@app/_services/all.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  feeds = [];

  url: string;
  page_number = 1;
  page_limit = 8;
  user: any;
  channel_id: any;


  constructor(
    private http: HttpClient,
    private service: AllService,
    private auth: AuthService,
    public modalController: ModalController
  ) { }



  ngOnInit() {

    const user = this.auth.decode();
    this.user = user.uid;

    this.service.getSub(1).subscribe(
      data => {

        data.forEach(sub => {
          this.channel_id = sub.channel_id;
          // console.log(this.channel_id);
          this.getFeeds( false, '' );
          // console.log(this.feeds);
          
        });
        
        
        //
          
        //
          
        }
      
    )
  }


  details() {
    console.log('seen');
  }


  async detailsModal(id) {
    const modal = await this.modalController.create({
      component: FeedDetailsComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id: id
      }
    });

    modal.onDidDismiss().then(() => {
     this.reload();
 });
    return await modal.present();
  }

  reload(){
    const user = this.auth.decode();
  }


  getFeeds(isFirstLoad, event) {

    this.url = this.channel_id + '?page=' + this.page_number;
    // this.url = '?page=' + this.page_number + '&_limit=' + this.page_limit;

    this.service.getFeedsPaginate(this.url)
      .subscribe((data: any) => {

        console.log(data);
        if(data.length>1){

          data.forEach(element => {
            this.feeds.push(element);
          });

        }

        else {
          this.feeds.push(data[0]);
        }
        

        if (isFirstLoad) {
          event.target.complete();
        }

        this.page_number++;
        //console.log(this.feeds);
      },

      error => {
        console.log(error);
      });
  }

  doInfinite(event) {
    this.getFeeds(true, event);
  }


}
