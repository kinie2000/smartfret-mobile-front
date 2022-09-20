import { AuthService } from './../../services/auth-service';
import { DatePipe, registerLocaleData } from '@angular/common';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast-service';
import localeFr from '@angular/common/locales/fr';
import { CommandeService } from 'src/app/services/commande-service';
import { IonDatetime } from '@ionic/angular';
registerLocaleData(localeFr);
@Component({
  selector: 'app-retreivement',
  templateUrl: './retreivement.page.html',
  styleUrls: ['./retreivement.page.scss'],
})
export class RetreivementPage implements OnInit {
  layoutData: any = {};
  dateLocal = new Date();
  dateLocalFormat: string;
  data: any = {};
  editform: FormGroup;
  partten = '^[a-zA-Z0-9 +/,_]{5,50}$';
  partten2 = '^[a-zA-Z0-9 éèà@.\'``()+/,_]{0,255}$';
  mobnumPattern = '^[6]+[2|5|6|7|8|9]+[0-9]{6}$';
  user: any;
  customPickerOptions1: any;
  customPickerOptions2: any;
  customPickerOptions3: any;
  customPickerOptionsTime: any;
  @ViewChild('mydt1') mydt1: IonDatetime;
  @ViewChild('mydt2') mydt2: IonDatetime;
  @ViewChild('mydt3') mydt3: IonDatetime;
  @ViewChild('mytime') mytime: IonDatetime;
  progressBar = false;
  intvalDate = [];
  constructor(
    private fb: FormBuilder,
    private toastservice: ToastService,
    private cmdService: CommandeService,
    private authService: AuthService
  ) {
    this.customPickerOptions1 = {
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
        },
        {
          text: 'Enregistrer',
          handler: (res) => {
            this.mydt1.value =
              res.day.text +
              ' ' +
              res.month.text +
              ' ' +
              res.year.text +
              ' ' +
              res.hour.text +
              ':' +
              res.minute.text +
              ' ' +
              res.ampm.text;
          },
        },
      ],
    };

    this.customPickerOptions2 = {
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
        },
        {
          text: 'Enregistrer',
          handler: (res) => {
            this.mydt2.value =
              res.day.text +
              ' ' +
              res.month.text +
              ' ' +
              res.year.text +
              ' ' +
              res.hour.text +
              ':' +
              res.minute.text +
              ' ' +
              res.ampm.text;
          },
        },
      ],
    };

    this.customPickerOptions3 = {
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
        },
        {
          text: 'Enregistrer',
          handler: (res) => {
            this.mydt3.value =
              res.day.text +
              ' ' +
              res.month.text +
              ' ' +
              res.year.text +
              ' ' +
              res.hour.text +
              ':' +
              res.minute.text +
              ' ' +
              res.ampm.text;
          },
        },
      ],
    };

    this.customPickerOptionsTime = {
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
        },
        {
          text: 'Enregistrer',
          handler: (res) => {
            this.mytime.value =
              res.hour.text + ':' + res.minute.text + ' ' + res.ampm.text;
          },
        },
      ],
    };
  }

  ngOnInit() {
    let month =
      this.dateLocal.getMonth() + 1 > 9
        ? this.dateLocal.getMonth() + 1
        : '0' + (this.dateLocal.getMonth() + 1);

    let date =
      this.dateLocal.getDate() > 9
        ? this.dateLocal.getDate()
        : '0' + this.dateLocal.getDate();

    this.dateLocalFormat =
      this.dateLocal.getFullYear() + '-' + month + '-' + date;

    console.log(this.dateLocalFormat);
    this.layoutData = this.getLayoutData();
    this.user = JSON.parse(localStorage.getItem('user')).data;
    this.intForm();
  }
  ionViewWillEnter() {
    this.authService.getlocal();
  }

  intForm() {
    this.editform = this.fb.group({
      tel: ['', [Validators.pattern(this.mobnumPattern), Validators.required]],
      code: ['', Validators.required],
      dtRet1: ['', Validators.required],
      dtRet2: ['', Validators.required],
      dtRet3: [''],
      adresse: [
        this.user.customer_adress,
        [Validators.required, Validators.pattern(this.partten)],
      ],
      descr: [
        'Aucune description',
        [Validators.required, Validators.pattern(this.partten2)],
      ],
    });
  }

  getLayoutData() {
    return {
      title: 'Smart Fret Transport',
      subtitle: 'Transport & Logistique',
      context:
        'Vous souhaitez faire enlever votre colis à domicile ? Remplissez le formulaire ci-dessous, Nous vous recontacterons.',
      description: 'Description des colis',
      submit: 'Envoyer',
      logo: 'assets/imgs/logo_2.png',
    };
  }

  onSubmitFunc() {
    // console.log(this.editform.value);
    let obj = {
      id: this.user.id,
      demande: 'enlevement',
      dateRetrait1: this.convertDate(this.editform.get('dtRet1').value),
      dateRetrait2: this.convertDate(this.editform.get('dtRet2').value),
      dateRetrait3: this.editform.get('dtRet3').value
        ? this.convertDate(this.editform.get('dtRet3').value)
        : '',
      adresseRetrait: this.editform.get('adresse').value,
      descriptionRetrait: this.editform.get('descr').value,
      telephoneRetrait:
        this.editform.get('code').value + ' ' + this.editform.get('tel').value,
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
        this.toastservice.presentAlertConfirmPerso(
          'Alerte !',
          'Une erreur s\'est produite veillez réessayer plus tard'
        );
        this.activatedProgressBar();
        console.log(error);
      }
    );
  }

  convertDate(value) {
    let date = new DatePipe('fr');
    return date.transform(value, 'EEE d MMMM y À hh:mm a');
  }

  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }
}
