import { MenuController, NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastService } from "src/app/services/toast-service";

@Component({
  selector: "app-new-pass",
  templateUrl: "./new-pass.page.html",
  styleUrls: ["./new-pass.page.scss"],
})
export class NewPassPage implements OnInit {
  layoutData: any = {};
  isPasswordVisible: boolean = false;
  editForm: FormGroup;
  data: any = {
    email: "",
    password: "",
  };
  passe = "^[a|A-z|Z0-9]{8,20}$";
  user: any = {
    data: null,
    permission: null,
  };
  dates = new Date();
  loginUrl = "";

  progressBar = false;

  radio: boolean = true;
  type: any;

  input1: any = {
    label: "",
    type: "",
    icon: "",
    validator: "",
  };

  code = null;
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private fb: FormBuilder,
    private activetedRoute: ActivatedRoute,
    private toastCtrl: ToastService,
    private authSerice: AuthService
  ) {}

  ngOnInit() {
    this.authSerice.getlocal();
    this.data = this.getDataForLayout1();
    this.code = this.activetedRoute.snapshot.params["code"];
    // console.log(this.code);
    !this.code ? this.openPage("validatePassword") : true;
    this.initForm();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  initForm() {
    this.editForm = this.fb.group(
      {
        pwd: ["", [Validators.required, Validators.pattern(this.passe)]],
        pwdConf: ["", [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  getPasswordType() {
    return this.isPasswordVisible ? "text" : "password";
  }

  changeVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getIconByType() {
    return this.isPasswordVisible ? "eye" : "eye-off";
  }

  getDataForLayout1 = (): any => {
    return {
      toolbarTitle: "Nouveau mot de passe",
      title: "SmartFret transport",
      subtitle: "Transport & Logistique",
      background: "assets/imgs/background/29.jpg",
      newpassword: "Nouveau mot de passe",
      oldpassword: "Répéter le mot de passe",
      signuptext: "J'ai déjà un compte",
      signup: "Se connecter",
      reset: "Réinitialiser le Mot De Passe",
      logo: "assets/imgs/logo.png",
      footer:
        "Copyright © " +
        this.dates.getFullYear() +
        " SMARTFRET TRANSPORT /V1.0/ All rights reserved",
    };
  };

  openPage(url: string) {
    this.navCtrl.navigateForward(["/" + url]);
  }

  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const password = group.get("pwd").value;
    const confirmPassword = group.get("pwdConf").value;

    return password === confirmPassword ? null : { notSame: true };
  }

  Submit() {
    let obj = {
      code: this.code,
      pwd: this.editForm.get("pwd").value,
    };
    this.authSerice.changePassword(obj).then((res: any) => {
      console.log(res);
      if (res.statut) {
        this.toastCtrl.presentToastPerso(res.message, "primary", "Bottom");
        this.openPage("signin");
      } else {
        this.toastCtrl.presentToastPerso(res.message, "warning", "Bottom");
      }
    });
  }
}
