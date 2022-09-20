import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandInt } from 'src/app/CommandeIn';
import { CommandeService } from 'src/app/services/commande-service';
import { ToastService } from 'src/app/services/toast-service';

import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.page.html',
  styleUrls: ['./detail-commande.page.scss'],
})
export class DetailCommandePage implements OnInit {
  id: any;
  image: string;
  title: any = 'kinie';
  // tslint:disable-next-line:variable-name
  statu_container;
  // tslint:disable-next-line:variable-name
  valeur_statut;
  currentCommands: CommandInt;

  commandIcon = 'assets/imgs/icons/command-icon.png';
  backbtn;

  // tslint:disable-next-line:variable-name
  var_paq: any = [];
  paquet: CommandInt[];
  StatusBar: StatusBar;
  user: any = {};
  idBonCmd: any = 0;
  progressBar = false;

  constructor(
    private route: ActivatedRoute,
    private servHttp: CommandeService,
    private toastservice: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getlocal();
    this.activatedProgressBar();
    this.user = JSON.parse(localStorage.getItem('user')).data;
    this.idBonCmd = this.route.snapshot.paramMap.get('id');
    this.getCmd(this.idBonCmd);

    if( this.user.profil === 'admin')
   {
this.backbtn = '/admin-dcb';
   }
   else
   {
     this.backbtn = '/commands';
   }
  }

  ionViewWillEnter() {
    this.authService.getlocal();
  }
  getCmd(idBonCmd) {
    this.servHttp.getDet(idBonCmd).subscribe((res0: CommandInt) => {
      this.activatedProgressBar();
      this.currentCommands = res0;
      console.log(this.currentCommands);

      this.servHttp.get(idBonCmd).subscribe(
        (res1: CommandInt[]) => {
          this.paquet = res1;
          console.log(this.paquet);
          // this.statu_container = this.currentCommands.packet_status;
        },
        (error) => {
          this.toastservice.presentAlertConfirmPerso(
            'Alerte !',
            'Une erreur s\'est produite veillez réessayer plus tard'
          );
          // this.activatedProgressBar();
          console.log('faux');
        }
      );
    });
  }
/*
  getCmd(idUser, idBonCmd) {
    this.servHttp.getAll(idUser).subscribe((res0: CommandInt[]) => {
      this.activatedProgressBar();
      this.currentCommands = res0.find((elt) => elt.id == idBonCmd);

      if (this.currentCommands) {
        this.servHttp.get(idBonCmd).subscribe((res1: CommandInt[]) => {
          this.paquet = res1;
        });
      }
    });
  }*/
  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
