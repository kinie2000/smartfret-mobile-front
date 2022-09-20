import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "src/app/services/customer-service";

@Component({
  selector: "app-profils",
  templateUrl: "./profils.page.html",
  styleUrls: ["./profils.page.scss"],
})
export class ProfilsPage implements OnInit {
  editForm: FormGroup;
  user: any = {};
  profil = "";
  partten = "^[a-zA-Z0-9 _]{0,20}$";
  mobnumPattern = "^(00|(\\+33)|(\\+32)|(\\+237))|[6]+[2|5|6|7|8|9]+[0-9]{6}$";
  country = [
    "Algérie",
    "Allemagne",
    "Argentine",
    "Australie",
    "Belgique",
    "Bénin",
    "Brésil",
    "Canada",
    "Chine",
    "Espagne",
    "États-Unis",
    "France",
    "Italie",
    "Mexique",
    "Russie",
    "Cameroun",
  ];
  constructor(
    private fb: FormBuilder,
    private authSerice: AuthService,
    private customerService: CustomerService

  ) {
    this.authSerice.getlocal();
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user")).data;
    this.profil = this.user.profil;
    this.initForm();
  }

  initForm() {
    if (this.user.profil == "client") {
      this.editForm = this.fb.group({
        nom: [
          this.user.customer_name,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        prenom: [
          this.user.customer_surname,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        mail: [
          this.user.customer_mail,
          [Validators.required, Validators.email],
        ],
        tel: [
          this.user.customer_phone,
          [Validators.required, Validators.pattern(this.mobnumPattern)],
        ],
        adress: [this.user.customer_adress, [Validators.required]],
        adressO: [this.user.customer_other_adress],
        cni: [this.user.customer_cni, [Validators.pattern(this.partten)]],
        ville: [
          this.user.customer_city,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        pays: [
          this.user.customer_country,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        codePostal: [this.user.customer_post_code, [Validators.required]],
      });
    } else {
      this.editForm = this.fb.group({
        nom: [
          this.user.user_name,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        prenom: [
          this.user.user_surname,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        mail: [this.user.user_mail, [Validators.required, Validators.email]],
        tel: [
          this.user.user_phone,
          [Validators.required, Validators.pattern(this.mobnumPattern)],
        ],
        adress: [this.user.user_adress, [Validators.required]],
        adressO: [this.user.user_other_adress],
        cni: ["", [Validators.pattern(this.partten)]],
        ville: [
          this.user.user_city,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        pays: [
          this.user.user_country,
          [Validators.required, Validators.pattern(this.partten)],
        ],
        codePostal: ["", [Validators.required]],
      });
    }
  }

  async submit() {
    let object = {};
    let user: any = {};
    if (this.user.profil == "client") {
      object = {
        id: this.user.id,
        customer_name: this.editForm.get("nom").value,
        customer_surname: this.editForm.get("prenom").value,
        customer_mail: this.editForm.get("mail").value,
        customer_phone: this.editForm.get("tel").value,
        customer_adress: this.editForm.get("adress").value,
        customer_other_adress: this.editForm.get("adressO").value,
        customer_cni: this.editForm.get("cni").value,
        customer_city: this.editForm.get("ville").value,
        customer_country: this.editForm.get("pays").value,
        customer_post_code: this.editForm.get("codePostal").value,
      };
    }
    user = await this.customerService.updateCustomer(object).then(
      (res: any) => {
        return res.user;
      },
      (error) => {
        console.log(error);
      }
    );
    this.authSerice.deleteStorage("user");
    user = await this.authSerice.setStorage("user", user).then((res: any) => {
      return res;
    });
    this.user = user;
  }
}
