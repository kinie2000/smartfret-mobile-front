import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from 'src/app/services/toast-service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  layoutData: any = {};
  isPasswordVisible = false;
  editForm: FormGroup;
  data: any = {
    email: '',
    password: '',
  };
  mobnumPattern = '^(00|(\\+33)|(\\+32)|(\\+237))|[6]+[2|5|6|7|8|9]+[0-9]{6}$';
  user: any = {
    data: null,
    permission: null,
  };
  dates = new Date();
  loginUrl = '';

  progressBar = false;

  radio = true;
  type: any;

  input1: any = {
    label: '',
    type: '',
    icon: '',
    validator: '',
  };
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private authSer: AuthService,
    private fb: FormBuilder,
    // tslint:disable-next-line:no-shadowed-variable
    private AuthService: AuthService,
    private activetedRoute: ActivatedRoute,
    private toastCtrl: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.AuthService.getlocal();
    this.menuCtrl.enable(false);
    this.layoutData = this.getLayoutData();
    this.initForm();
  }

  initForm() {
    let validation: any;
    if (this.radio) {
      validation = [Validators.required, Validators.email];
      this.input1LayoutForm('email', 'email', 'mail-outline', validation);
    } else {
      validation = [
        Validators.required,
        Validators.pattern(this.mobnumPattern),
      ];
      this.input1LayoutForm(
        'Numéro de tel',
        'text',
        'phone-portrait-outline',
        validation
      );
    }

    this.editForm = this.fb.group({
      login: ['', this.input1.validator],
      password: ['', [Validators.required]],
    });
  }

  getLayoutData() {
    return {
      title: 'SmartFret Transport',
      email: 'Email',
      password: 'Mot de passe',
      submit: 'Se connecter',
      logo: 'assets/imgs/logo.png',
      bgImg: 'assets/imgs/background.jpg',
      footer:
        'Copyright © ' +
        this.dates.getFullYear() +
        ' SMARTFRET TRANSPORT /V1.0/ All rights reserved',
    };
  }

  input1LayoutForm(label, type, icon, validator) {
    this.input1.validator = validator;
    this.input1.type = type;
    this.input1.label = label;
    this.input1.icon = icon;
  }

  onSubmitFunc() {
    const objUser = {
      client: this.radio,
      login: this.editForm.get('login').value,
      password: this.editForm.get('password').value,
    };

    this.authSer.login(objUser).subscribe(
      (res: any) => {
        if (res) this.activatedProgressBar();

        if (res.statut) {
          this.user.data = res.user;
          // tslint:disable-next-line:prefer-const
          let dataUser = null;
          this.AuthService.setStorage2('user', JSON.stringify(this.user));

          this.AuthService.setStorage2('connectUser', 'true');
           this.user = JSON.parse(localStorage.getItem('user')).data;
           if (this.user.profil==='admin') {
            this.openPage('admin-dcb'); 
           }
           else
           {
this.openPage('commands');
           }
          this.menuCtrl.enable(true);
        } else {
          this.AuthService.setStorage2('connectUser', 'false');
          this.toastCtrl.presentToastPerso(res.message, 'warning', 'bottom');
        }
      },
      (error) => {

        this.AuthService.setStorage2('connectUser', 'false');

        this.toastCtrl.presentAlertConfirmPerso(
          'Alerte !',
          'Une erreur s\'est produite veillez réessayer plus tard'
        );
        this.activatedProgressBar();
        console.log(error);
      }
    );
  }

  getPasswordType() {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  changeVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getIconByType() {
    return this.isPasswordVisible ? 'eye' : 'eye-off';
  }

  openPage(url: string) {
    if (url === 'FgP') {
      this.navCtrl.navigateForward(['/' + url, {}]);
    } else if (url !== 'FgP') {
      this.menuCtrl.enable(true);
      this.navCtrl.navigateRoot(['/' + url, {}]);
    }
  }

  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }

  changeEtatRadio() {
    this.radio = !this.radio;
    this.initForm();
  }
}
