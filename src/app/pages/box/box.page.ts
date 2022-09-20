import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { CommandeService } from 'src/app/services/commande-service';
import { ToastService } from 'src/app/services/toast-service';

@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.scss'],
})
export class BoxPage implements OnInit {
  layoutData: any = {};

  data: any = {};
  editform: FormGroup;
  mobnumPattern = '^(00|(\\+33)|(\\+32)|(\\+237))+[6]+[2|5|6|7|8|9]+[0-9]{6}$';
  user: any;
  nbEmb = 1;
  progressBar = false;
  constructor(
    private fb: FormBuilder,
    private toastservice: ToastService,
    private cmdService: CommandeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getlocal();
    this.layoutData = this.getLayoutData();
    this.user = JSON.parse(localStorage.getItem('user')).data;
  }

  ionViewWillEnter() {
    this.authService.getlocal();
  }

  getLayoutData() {
    return {
      title: 'Smart Fret Transport',
      subtitle: 'Transport & Logistique',
      context:
        'Vous voulez commander un emballage pour vos colis ? Choisir le nombre d\'emballage en cliquant sur les boutons + ou - ci-dessous.',
      description: 'Description des colis',
      submit: 'Commandez',
      logo: 'assets/imgs/logo_2.png',
    };
  }

  onChangeSelect(event) {
    console.log(event);
  }

  onChangeEmb(statut: boolean) {
    let A = this.nbEmb;
    if (statut) {
      if (A >= 100) {
        this.nbEmb = A;
      } else {
        this.nbEmb = ++A;
      }
    } else {
      if (A <= 1) {
        this.nbEmb = A;
      } else {
        this.nbEmb = --A;
      }
    }
  }
  onSubmitFunc() {
    this.activatedProgressBar();
    let obj = {
      id: this.user.id,
      nombreEmballage: this.nbEmb,
      demande: 'emballage',
    };
    this.cmdService.commandeServiceClient(obj).subscribe(
      (res: any) => {
        this.toastservice
          .presentAlertConfirmPerso(
            'Service Client',
            'Votre demande a bien été reçu. <br> Nous vous contacterons dans les plus brefs délais !!!'
          )
          .then(() => {
            this.activatedProgressBar();
          });
      },
      (error) => {
        this.activatedProgressBar();
        this.toastservice.presentAlertConfirmPerso(
          'Alerte !',
          'Une erreur s\'est produite veillez réessayer plus tard'
        );
        console.log(error);
      }
    );
  }
  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }
}
