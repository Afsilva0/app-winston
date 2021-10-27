import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  showSkip = true;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(public menu: MenuController, public router: Router) {}

  ngOnInit(): void {}

  startApp(): void {
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

  onSlideChangeStart(event): void {
    event.target.isEnd().then((isEnd) => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter(): void {
    this.menu.enable(false);
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ionViewDidLeave(): void {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
