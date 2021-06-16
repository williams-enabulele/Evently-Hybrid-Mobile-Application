import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  @ViewChild('slider', { read: undefined, static: false }) slider: IonSlides;
  @ViewChild('segment', { read: undefined, static: false }) segment: IonSegment;
  slideOpts = {
    initialSlide: 1,
    speed: 100
  };

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    const token = this.auth.decode();
    // let fullname = token.fullname;
    // const uid = token.uid;

    // localStorage.setItem('fullname', fullname);
    // console.log('fullname: ' + fullname, 'uid: ' + uid );
  }

  async segmentChanged(event: any) {
    const slideId = +(event.detail.value as string).replace('ion-sb-', '');
    await this.slider.slideTo(slideId, 100);
  }

  async slideChanged() {
    this.segment.value =
      'ion-sb-' + (await this.slider.getActiveIndex()).toString();
  }
}
