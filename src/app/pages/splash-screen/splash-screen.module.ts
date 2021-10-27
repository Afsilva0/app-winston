import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { SplashScreenPageRoutingModule } from './splash-screen-routing.module';
import { SplashScreenPage } from './splash-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    SplashScreenPageRoutingModule,
  ],
  declarations: [SplashScreenPage],
})
export class SplashScreenPageModule {}
