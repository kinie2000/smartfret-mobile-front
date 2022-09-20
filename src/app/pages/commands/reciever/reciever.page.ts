import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { RecieverIn } from 'src/app/reciever-in';
import { CommandeService } from 'src/app/services/commande-service';

@Component({
  selector: 'app-reciever',
  templateUrl: './reciever.page.html',
  styleUrls: ['./reciever.page.scss'],
})
export class RecieverPage implements OnInit {
  @Input() Idclt: number;
  public registerForm: FormGroup;
  public data: RecieverIn;
  public idreciever;
  public obj;
  constructor(
    private servHttp: CommandeService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef,
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      receiver_name: ['', Validators.required],
      receiver_surname: '',
      receiver_email: ['', [Validators.required, Validators.email]],
      receiver_cni: [
        '',
        [
          Validators.maxLength(9),
          Validators.minLength(13),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      receiver_phone1: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      receiver_phone2: [
        '',
        [Validators.maxLength(10), Validators.pattern('^[0-9]+$')],
      ],
      receiver_city: ['', Validators.required],
      receiver_adress: '',
      customer_id: '',
    });
    console.log(this.Idclt);
  }
    get registerFormControl() {
    return this.registerForm.controls;
  }
  saveData() {
    this.registerForm.get('customer_id').setValue(this.Idclt);
    this.data = this.registerForm.value;
    this.servHttp.createReceiver(this.data).subscribe(
      (response: RecieverIn) => {
        console.log(response);
        console.log(this.data);
        this.idreciever = response;
        this.router.navigate(['commands/newcmd/']);
        console.log(this.idreciever);
        this.obj = {
          name: this.data.receiver_name,
          prenom: this.data.receiver_surname,
          id: this.idreciever,
        };
        this.modalController.dismiss(this.obj);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async dismiss() {
    await this.modalController.dismiss();
  }
}
