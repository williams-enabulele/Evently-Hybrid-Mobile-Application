import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AllService } from '@app/_services/all.service';
import { AuthService } from '@app/_services/auth.service';

@Component({
  selector: 'app-rooting-list',
  templateUrl: './rooting-list.component.html',
  styleUrls: ['./rooting-list.component.scss'],
})
export class RootingListComponent implements OnInit {

  datas =[];

  constructor(
    public modalCtrl: ModalController,
    private all: AllService,
    private auth: AuthService

  ) { }

  ngOnInit() {
    const token = this.auth.decode();
    const uid = token.uid;

    this.all.getFollowingList(uid).subscribe(
      data => {
        this.datas = data;
        console.log(this.datas);

      }
    )
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
