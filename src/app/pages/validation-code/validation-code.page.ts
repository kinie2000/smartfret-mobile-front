import { AuthService } from "./../../services/auth-service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuController, NavController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast-service";

@Component({
  selector: "app-validation-code",
  templateUrl: "./validation-code.page.html",
  styleUrls: ["./validation-code.page.scss"],
})
export class ValidationCodePage implements OnInit {
  item = {
    email: "",
  };
  mobnumPattern = "^[0-9]{5}$";
  layoutData: any = {};
  editForm: FormGroup;
  dates = new Date();
  progressBar = false;
  codeValid = true;

  constructor(
    private toastCtrl: ToastService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private authService: AuthService

  ) {
    this.authService.getlocal();
  }


  ngOnInit(): void {
    this.layoutData = this.getLayoutData();
    this.intForm();
  }

  intForm() {
    this.editForm = this.fb.group({
      code: ["", [Validators.required, Validators.pattern(this.mobnumPattern)]],
    });
  }

  onTextChangeEmailFunc(event): void {
    if (event) {
      event.stopPropagation();
    }
    this.item.email = this.getValueFromItem(event);
  }

  getValueFromItem(item) {
    let result = "";
    if (item.detail && item.detail.target) {
      result = item.detail.target.value;
    }
    return result;
  }

  getLayoutData() {
    return {
      title: "SmartFret Transport",
      label: "Saisir le Code de validation",
      password: "Mot de passe",
      submit: "Valider  ",
      logo: "assets/imgs/logo.png",
      bgImg: "assets/imgs/background.jpg",
      subtitle: "Mot de passe oublié",
      footer:
        "Copyright © " +
        this.dates.getFullYear() +
        " SMARTFRET TRANSPORT /V1.0/ All rights reserved",
    };
  }

  Submit() {
    this.authService.verifyCode(this.editForm.get("code").value).then(
      (res: any) => {
        if (res.status) {
          this.activatedProgressBar();
          this.navCtrl.navigateForward([
            "/newPassword",
            { code: this.editForm.get("code").value },
          ]);
        } else {
          this.codeValid = false;
          this.activatedProgressBar();
          this.toastCtrl.presentToastPerso(res.message, "warning", "Bottom");
        }
      },
      (error) => {
        this.toastCtrl.presentAlertConfirmPerso(
          "Alerte !",
          "Une erreur s'est produite veillez réessayer plus tard"
        );
        this.activatedProgressBar();
        console.log(error);
      }
    );
  }

  hideMessageCodeValidation(e) {
    this.codeValid = true;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }
}
