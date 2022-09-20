import { ColisIn } from './../../colisIn';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommandeService } from 'src/app/services/commande-service';
import { MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast-service';

import { AuthService } from 'src/app/services/auth-service';
import { splitAtColon } from '@angular/compiler/src/util';


@Component({
  selector: 'app-colis',
  templateUrl: './colis.page.html',
  styleUrls: ['./colis.page.scss'],
})
export class ColisPage implements OnInit {

  colis: ColisIn;
  rech: any;
  valeur: any;
  coliscur: any;
  varcontenu = '';
  varcars: string = 'non';
  subscription: any;
  dataColis = [];
  partten = '^[0-9]{12,13}$';
  logo = 'assets/imgs/logo_2.png';
  error: boolean = false;
  suspect: boolean = false;
  progressBar: boolean = false;

  commandIcon: string = 'assets/imgs/icons/suivie.png';
  commandIcons: string = 'assets/imgs/icons/package.png';
  commandSucpect: string = 'assets/imgs/icons/suspect.png';
  commandError: string = 'assets/imgs/icons/attention.png';


  user: any;



  constructor(
    private Servhttp: CommandeService,
    private renderer: Renderer2,
    private el: ElementRef,
    private menuCtrl: MenuController,

    private toastservice: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getlocal();

    localStorage.getItem('user')
      ? (this.user = JSON.parse(localStorage.getItem('user')).data)
      : '';
  }
  getcolis(id) {
    this.Servhttp.get(id).subscribe(
      (data: ColisIn) => {
        this.colis = data;
      },
      (error) => {
        this.toastservice.presentAlertConfirmPerso(
          'Alerte !',
          'Une erreur s\'est produite veillez réessayer plus tard'
        );
        console.log(error);
      }
    );
  }

  recherche(event: any) {
    this.valeur = event.detail.value;
    // this.valeur = this.valeur.split(";");

    // console.log(this.valeur);

    if (this.valeur && !this.valeur.match(this.partten)) {
      this.error = true;
      this.suspect = false;
      this.progressBar = false;
    } else {
      this.coliscur = null;
      this.error = false;
      this.suspect = false;
    }

    if (!this.error && this.valeur) {
      this.progressBar = true;
      this.Servhttp.getpacket(this.valeur).subscribe(
        (data: ColisIn) => {
          this.colis = data;

          // console.log(data);
          if (this.colis) {
            this.suspect = false;
            this.coliscur = this.colis;
            this.progressBar = false;
            // console.log("true");
            this.renderer.removeClass(this.el.nativeElement, 'contenu_faux');

            if (this.colis.car_id) {
              this.varcars = 'oui';
            } else {
              this.varcars = 'non';
            }
          } else {
            this.suspect = true;
            this.varcontenu = 'le colis renseigné n\'existe pas';
            this.renderer.removeClass(this.el.nativeElement, 'contenu_vrai');
            this.coliscur = null;
            this.progressBar = false;
          }
        },
        (error) => {
          this.toastservice.presentAlertConfirmPerso(
            'Alerte !',
            'Une erreur s\'est produite veillez réessayer plus tard'
          );
          console.log(error);
          this.progressBar = false;
        }
      );
    }
  }

  ionViewWillEnter() {
    !localStorage.getItem('user')
      ? this.menuCtrl.enable(false)
      : this.menuCtrl.enable(true);
  }
}
