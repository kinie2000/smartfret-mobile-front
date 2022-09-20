import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { CommandInt } from 'src/app/CommandeIn';
import { CommandeService } from 'src/app/services/commande-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaquetInt } from '../../paquetIn';

@Component({
  selector: 'app-addcmd',
  templateUrl: './addcmd.page.html',
  styleUrls: ['./addcmd.page.scss'],
})
export class AddcmdPage implements OnInit {
  public registerForm: FormGroup;
  public registerForm2: FormGroup;
  public data: Array<CommandInt>;
  public tab:Array<PaquetInt> = [];
  public tab2: any[];
  public paquet;
  nbr=0;
  val;

  constructor(private servHttp: CommandeService, private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      packet_title: '',
      divisor_value: '',
      choix: '',
      number: '',
      packet_length: [{ value: '', disabled: false }],
      packet_width: '',
      packet_heigth: '',
      Typecoli: 'dimension',
      purchase_order_number: '',
      purchase_order_title: '',
      inc:0,
      purchase_order_id:0,
      modepay:'',
      montant_recu:'',
      packet_price:0,
      recepteur:'',
      expedieur:''
    });
  }
  // tslint:disable-next-line:no-trailing-whitespace

  saveData() {
    console.log(this.registerForm.value);
    /*
      const data:PaquetInt={
        packet_title: form.value.packet_title,
        divisor_value:form.value.divisor_value,
        choix:form.value.choix,
        number:form.value.number,
        packet_length:form.value.packet_length,
        packet_width:form.value.packet_width,
        packet_heigth:form.value.packet_heigth,
      };
      this.servHttp.createcmd(data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
      });
    */

    this.data = this.registerForm.value;
    console.log(this.data);
    console.log(this.tab);
     console.log(this.nbr);
    }
  addcoli() {
   this.tab.push(this.registerForm.value);
    console.log(this.tab);
    // tslint:disable-next-line:no-unused-expression
    console.log(this.nbr++);

    /*
        this.servHttp.createcmd(this.data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
       this.paquet=this.tab.concat(this.registerForm.value);
       console.log(this.paquet);*/
  }
  evtAddcoli(methode: string) {
    this.data = this.registerForm.value;
    if (methode === 'dimension') {
      // tslint:disable-next-line:no-unused-expression
      // longueur.disable();
      this.registerForm.get('packet_price').disable();
    } else {
      // longueur.enable();
      this.registerForm.get('packet_length').disable();
      this.registerForm.get('packet_width').disable();
      this.registerForm.get('packet_heigth').disable();
    }
   this.registerForm.get('packet_length').updateValueAndValidity();
   this.registerForm.get('packet_width').updateValueAndValidity();
   this.registerForm.get('packet_heigth').updateValueAndValidity();
   this.registerForm.get('packet_price').updateValueAndValidity();
  }

  paie(methode:string)
  {
    if (methode==='cartebleue') {
    }
  }
}
