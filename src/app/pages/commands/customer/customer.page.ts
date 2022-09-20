import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerIn } from 'src/app/customer-in';
import { CommandeService } from 'src/app/services/commande-service';


import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  public registerForm: FormGroup;
  public data: CustomerIn;
  public idcosumer;
  public obj;
  constructor(
    private servHttp: CommandeService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_surname: '',
      category_id: '',
      reduction_value: '',
      augmentation: '',
      customer_city: ['', Validators.required],
      customer_adress: '',
      customer_country: ['', Validators.required],
      customer_mail: ['', [Validators.required, Validators.email]],
      customer_phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(9),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      customer_picture: '',
      customer_post_code: '',
      reduction_voiture: '',
      customer_other_adress: '',
      customer_cni: [
        '',
        [
          Validators.maxLength(9),
           Validators.minLength(13),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      Customer_contry_code: '',
      codeBati: '',
      numeroEtage: '',
    });
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  saveData() {
    const nompays = this.registerForm.get('customer_country').value;
    const val = nompays.charAt(0).toUpperCase() + nompays.slice(1);
    console.log(val);
    this.registerForm.get('customer_country').setValue(val);
    this.data = this.registerForm.value;
    this.servHttp.creatCustomer(this.data).subscribe(
      (response: CustomerIn) => {
        console.log(response);
        console.log(this.data);
        this.idcosumer = response;
        this.router.navigate(['commands/newcmd/']);
        console.log(this.idcosumer);
        this.obj = {
          name: this.data.customer_name,
          prenom: this.data.customer_surname,
          id: this.idcosumer,
        };
        this.modalController.dismiss(this.obj);
      },
      (error) => {
        console.log(error);
      }
    );
    // tslint:disable-next-line:no-unused-expression
  }
  close() {}
  async dismiss() {
    await this.modalController.dismiss();
  }
}
