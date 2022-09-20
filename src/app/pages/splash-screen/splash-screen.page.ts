import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit, OnChanges {
  data: any = {};
  type: string;
  @ViewChild('icon', { read: ElementRef, static: true }) icon: ElementRef;
  dates = new Date();

  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private animationCtrl: AnimationController,
    private authService: AuthService
  ) {
    this.authService.getlocal();
  }
  ngOnInit() {

    this.menuCtrl.enable(false);

    this.data = this.getLayoutData();
  }

  ngOnChanges() {}

  ngAfterViewInit() {
    this.animateButton();
  }

  openPage(url: string) {
    this.navCtrl.navigateForward(['/' + url, {}]);
  }

  animateButton() {
    const animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.icon'))
      .duration(800)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotateX(45deg)' },
        { offset: 0.5, transform: 'scale(1.2) rotateZ(180deg)', color: 'blue' },
        { offset: 1, transform: 'scale(1) rotateZ(180deg)' },
      ]);

    animation.play();
  }

  getLayoutData() {
    return {
      title: 'SmartFret Transport',
      subtitle: 'Transport & Logistique',
      btn1: 'Se connecter',
      btn2: 'Suivie',
      logo: 'assets/imgs/logo_2.png',
      date: this.dates.getFullYear(),
      version: ' V2.0',
    };
  }
}
