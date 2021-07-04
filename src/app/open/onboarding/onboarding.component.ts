import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';




@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  @ViewChild('mySlide', { static: false }) mySlide: ElementRef;
  skipMsg = 'Skip';

  constructor(
    public route: Router,

  ) { }

  ngOnInit() {}

  skip() {
    this.route.navigateByUrl('login');
  }

}
