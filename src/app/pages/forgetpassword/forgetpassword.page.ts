import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuController, NavController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth-service";
import { ToastService } from "src/app/services/toast-service";

@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.page.html",
  styleUrls: ["./forgetpassword.page.scss"],
})
export class ForgetPasswordPage implements OnInit {
  item = {
    email: "",
  };
  layoutData: any = {};
  editForm: FormGroup;
  dates = new Date();
  progressBar = false;
  radio: boolean = true;
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
    this.authService.deleteStorage("codevalidation");
  }

  intForm() {
    this.editForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
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
      email: "Email",
      password: "Mot de passe",
      submit: "Envoyer  ",
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
    let obj = { client: this.radio, email: this.editForm.get("email").value };
    this.authService.forgetPassword(obj).then(
      (res: any) => {

        // console.log(res);
        if (res.statut) {
          this.authService.setStorage2("codevalidation", res.code);

          this.activatedProgressBar();
          this.toastCtrl
            .presentToastPerso(
              "Un code de validation vous a été par mail",
              "primary",
              "middle"
            )
            .finally(() => {
              this.navCtrl.navigateForward(["/validatePassword", {}]);
            });
        } else {
          this.activatedProgressBar();
          this.toastCtrl.presentToastPerso(res.message, "warning", "Bottom");
        }
      },
      (error) => {
        this.activatedProgressBar();
        this.toastCtrl.presentAlertConfirmPerso(
          "Alerte !",
          "Une erreur s'est produite veillez réessayer plus tard"
        );
      }
    );
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }

  changeEtatRadio() {
    this.radio = !this.radio;
  }
}
