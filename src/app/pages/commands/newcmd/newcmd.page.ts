import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandInt } from 'src/app/CommandeIn';
import { CommandeService } from 'src/app/services/commande-service';
import { PaquetInt } from '../../paquetIn';
import { CustomerIn } from 'src/app/customer-in';
import { promise } from 'protractor';
import { RecieverIn } from 'src/app/reciever-in';
import { StandardIN } from 'src/app/standard-in';
import { SignaturePad } from 'angular2-signaturepad';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CustomerPage } from '../customer/customer.page';
import { CommandsPage } from '../commands.page';
import { ColisPage } from '../colis/colis.page';
import { RecieverPage } from '../reciever/reciever.page';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service';
import { ToastService } from 'src/app/services/toast-service';
import { EditcolisPage } from '../editcolis/editcolis.page';
import { Console } from 'console';
import { Storage } from '@ionic/storage';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-newcmd',
  templateUrl: './newcmd.page.html',
  styleUrls: ['./newcmd.page.scss'],
})
export class NewcmdPage implements OnInit {
  public registerForm: FormGroup;
  public registerForm2: FormGroup;
  public data: CommandInt;
  public tab: Array<PaquetInt> = [];
  public tab2: any[];
  public customer: Array<CommandInt> = [];
  public items: any[] = [];
  public valeurcst;
  public val;
  public k: any[];
  verifcoli;
  public cstid;
  // tslint:disable-next-line:variable-name
  public packet_price;
  public prixGroup;
  public standard: Array<StandardIN> = [];
  public TabmontantTotal: Array<number> = [];
  public montantTotal;
  public totalRecu;
  public montantRecu: Array<number> = [];
  public t: Array<number> = [];
  public i = 0;
  public var;
  public largeur;
  public hauteur;
  public longueur;
  public prix;
  public sendcolis = true;
  public dataReturned;
  public recStyle = true;
  public tabnbrcolis: Array<number> = [];
  public codeId;
  public reduction;
  public augmentation;
  public montantBon;
  public Rest;
  public nbrcolis;
  public tabsup: CommandInt;
  public v;
  public client;
  public autofocus;
  public desc;
  public color;

  // tslint:disable-next-line:ban-types
  signaturePadOptions: Object = {
    // tslint:disable-next-line:object-literal-key-quotes
    minWidth: 2,
    // tslint:disable-next-line:object-literal-key-quotes
    canvasWidth: 400,
    // tslint:disable-next-line:object-literal-key-quotes
    canvasHeight: 200,
  };
  signatureImg: string = null;
  title: any = null;
  description: any = null;
  user: any = {};
  constructor(
    private servHttp: CommandeService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private modal: ModalController,
    private authService: AuthService,
    private toastservice: ToastService,
    private activatedRoute: ActivatedRoute,
    private toastCtrl: ToastService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      packet_title: ['', Validators.required],
      divisor_value: [650, Validators.required],
      number: [''],
      packet_length: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      packet_width: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      packet_heigth: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      Typecoli: [''],
      purchase_order_number: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      purchase_order_title: ['', Validators.required],
      payement_method: [''],
      montant_recu: [''],
      MTtotal: [''],
      total: [''],
      Rest: [],
      packet_price: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      recepteur: ['', Validators.required],
      costumer_name: ['', Validators.required],
      packet_location: [''],
      packet_location_agency: [''],
      receiver_id: 0,
      costumer_id: 0,
      montantTotal: 0,
      montantRecu: 0,
      nbrpacket: '',
      espece: ['', [Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      Cheque: ['', [Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      reduction: [''],
      augmentation: [''],
      Cartebleue: [
        '',
        [Validators.maxLength(10), Validators.pattern('^[0-9]+$')],
      ],
      purchase_order_description: [''],
      Virementbancaire: [
        '',
        [Validators.maxLength(10), Validators.pattern('^[0-9]+$')],
      ],
      purchase_order_isDraft: '',
      selectcoli: this.fb.group({}),
      aliases: this.fb.array([]),
      checkArray: this.fb.array([]),
      mode_paie: this.fb.array([new FormControl()]),
      crtclient: '',
      iduser: '',
    });
    this.authService.getlocal();
    this.user = JSON.parse(localStorage.getItem('user')).data;
    console.log(this.user.id);
    this.registerForm.get('iduser').setValue(this.user.id);
    /* this.activatedRoute.data.subscribe((data) => {
      console.log('Check route resolver data');
      console.log(data);
      this.client = data;
    });*/
    // Some other method :)
    // this.desc = true;
    //  this.autofocus=false;
    this.evtAddcoli('dimension');
    this.addata();
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  f() {
    this.sendcolis = false;
  }
  saveData() {
    this.montantTotal = this.calculMontant();
    this.var = this.TabmontantTotal.length;
    for (let i = 0; i < this.var; i++) {
      this.i++;
    }
    this.registerForm.get('nbrpacket').setValue(this.nbrcolis);
    this.registerForm.get('montantRecu').setValue(this.montantTotal);
    // tslint:disable-next-line:no-unused-expression
    console.log(this.montantTotal);
    this.data = this.registerForm.value;
    this.data.signature = this.signatureImg;
    // tslint:disable-next-line:no-conditional-assignment
    console.log(this.data.signature);
    /*   if (this.data.signature === null) {
      this.toastCtrl.presentAlertConfirmPerso(
        'Alerte !',
        'la signature est obligatoire'
      );
    } else {
      console.log(this.data);
      this.servHttp.createcmd(this.data, this.tab).subscribe(
        (response) => {
          console.log(response);
          console.log(this.data);
          this.toastservice.presentAlertConfirmPerso(
            'Reussi !',
            'Bon de commande enregistré'
          );
          this.router.navigate(['admin-dcb']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
*/
    if (
      this.registerForm.get('packet_title').value === null ||
      this.registerForm.get('purchase_order_title').value === null ||
      this.registerForm.get('costumer_name').value === null ||
      this.registerForm.get('recepteur').value === null ||
      this.data.signature === null
    ) {
      this.toastCtrl.presentAlertConfirmPerso(
        'Alerte !',
        'tous les champs avec * doivent etre rempli'
      );
    } else {
      console.log(this.data);
      this.servHttp.createcmd(this.data, this.tab).subscribe(
        (response) => {
          console.log(response);
          console.log(this.data);
          this.toastservice.presentAlertConfirmPerso(
            'Reussi !',
            'Bon de commande enregistré'
          );
          this.router.navigate(['admin-dcb']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  addcoli() {
    if (this.registerForm.get('Typecoli').value === 'dimension') {
      this.packet_price = Math.round(
        ((this.registerForm.get('packet_width').value *
          this.registerForm.get('packet_length').value *
          this.registerForm.get('packet_heigth').value) /
          1000000) *
          this.registerForm.get('divisor_value').value
      );
      if (
        this.registerForm.get('packet_length').value === '' ||
        this.registerForm.get('packet_width').value === '' ||
        this.registerForm.get('packet_heigth').value === '' ||
        this.registerForm.get('divisor_value').value === ''
      ) {
        this.packet_price = 0;

        this.prixGroup = 0;
        console.log(this.packet_price);
      } else {
        this.registerForm.get('packet_price').setValue(this.packet_price);
        console.log(this.packet_price);
        if (this.registerForm.get('number').value === '') {
          this.prixGroup = this.packet_price;
        } else {
          this.prixGroup = Math.round(
            this.packet_price * this.registerForm.get('number').value
          );
        }
      }
      console.log(this.prixGroup);
      console.log('clicqué');
      this.registerForm.get('total').setValue(this.prixGroup);
    }
    if (this.registerForm.get('Typecoli').value === 'prix') {
      this.prixGroup = Math.round(
        this.registerForm.get('packet_price').value *
          this.registerForm.get('number').value
      );
      console.log(this.prixGroup);
      // this.registerForm.get('packet_price').setValue(this.prixGroup);
      this.registerForm.get('total').setValue(this.prixGroup);
    }
    /*  if (this.registerForm.get('Typecoli').value === 'standard') {
      this.prixGroup = Math.round(
        this.registerForm.get('packet_price').value *
          this.registerForm.get('number').value
      );
      console.log(this.prixGroup);
      this.registerForm.get('total').setValue(this.prixGroup);
    }*/
    if (this.registerForm.get('number').value > 1) {
      for (let i = 1; i < Number(this.registerForm.get('number').value); i++) {
        this.tab.push(this.registerForm.value);
      }
    }
    this.tab.push(this.registerForm.value);
    this.TabmontantTotal.push(this.registerForm.get('total').value);
    this.montantTotal = this.TabmontantTotal.reduce((acc, x) => acc + x);
    this.registerForm.get('montantTotal').setValue(this.montantTotal);
    console.log(this.tab);
    console.log(this.TabmontantTotal);
    console.log(this.montantTotal);

    this.registerForm.get('total').setValue(this.prixGroup);
    this.tabnbrcolis.push(Number(this.registerForm.get('number').value));
    this.nbrcolis = this.tabnbrcolis.reduce((acc, x) => acc + x);
    console.log(this.nbrcolis);
    console.log(this.registerForm.get('costumer_id').value);
    this.codeId = this.registerForm.get('costumer_id').value;
    console.log(this.codeId);
    this.servHttp.custcat(this.codeId).subscribe(
      (response: CustomerIn) => {
        console.log(this.codeId);
        console.log(response);
        if (response.reduction_value !== 0 && response.augmentation === 0) {
          this.reduction = response.reduction_value;
          this.augmentation = 0;
          console.log(this.reduction);
        } else if (
          response.reduction_value === 0 &&
          response.augmentation !== 0
        ) {
          this.reduction = 0;
          this.augmentation = response.augmentation;
        } else if (
          response.reduction_value === 0 &&
          response.augmentation === 0
        ) {
          if (response.category_id == null) {
            this.reduction = 0;
            this.augmentation = 0;
          } else {
            this.reduction = response.categorie.category_reduction_value;
            this.augmentation = response.categorie.category_augmentation;
          }
        }
        if (this.reduction === 0 && this.augmentation === 0) {
          this.montantBon = this.montantTotal;
        } else if (this.reduction !== 0 && this.augmentation === 0) {
          this.montantBon = Math.round(
            this.montantTotal - (this.montantTotal * this.reduction) / 100
          );
        } else if (this.reduction === 0 && this.augmentation !== 0) {
          this.montantBon = Math.round(
            this.montantTotal + (this.montantTotal * this.augmentation) / 100
          );
        }
        console.log(this.montantBon);
        console.log(this.augmentation);
        this.registerForm.get('MTtotal').setValue(this.montantBon);
        this.registerForm.get('augmentation').setValue(this.augmentation);
        this.registerForm.get('reduction').setValue(this.reduction);
        this.registerForm.get('Rest').setValue(this.montantBon);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  evtAddcoli(methode: string) {
    if (methode === 'dimension') {
      this.registerForm.get('Typecoli').setValue('dimension');
      this.largeur = false;
      this.hauteur = false;
      this.longueur = false;
      this.prix = true;
      this.autofocus = true;
      this.registerForm.get('packet_length').setValue('');
      this.registerForm.get('packet_width').setValue('');
      this.registerForm.get('packet_heigth').setValue('');
      this.registerForm.get('packet_title').setValue('');
    }
    if (methode === 'prix') {
      this.registerForm.get('Typecoli').setValue('prix');
      this.largeur = true;
      this.hauteur = true;
      this.longueur = true;
      this.prix = false;
      this.autofocus = true;
      this.registerForm.get('packet_length').setValue(0);
      this.registerForm.get('packet_width').setValue(0);
      this.registerForm.get('packet_heigth').setValue(0);
      this.registerForm.get('number').setValue('');
      this.registerForm.get('packet_price').setValue('');
      this.registerForm.get('packet_title').setValue('');
    }
    if (methode === 'standard') {
      this.registerForm.get('Typecoli').setValue('standard');
      this.servHttp.getstandard().subscribe((data: StandardIN[]) => {
        this.standard = data;
        console.log(this.standard);
      });
      this.largeur = true;
      this.hauteur = true;
      this.longueur = true;
      this.registerForm.get('packet_length').setValue(0);
      this.registerForm.get('packet_width').setValue(0);
      this.registerForm.get('packet_heigth').setValue(0);
      this.registerForm.get('number').setValue(1);
    }
  }

  autocompleteClt($event) {
    const value = $event.target.value;
    const lgt = $event.target.value.length;
    if (lgt > 1) {
      this.storage.get('k').then((val: CustomerIn[]) => {
        console.log(val);
        val.push();
        const vl = val.filter(
          (item) =>
            item.customer_name.toLowerCase().includes(value.toLowerCase()) ||
            item.customer_surname.toLowerCase().includes(value.toLowerCase())
        );
        this.items = vl;
        console.log(value);
        console.log(vl);
      });
    }

    /*  if (lgt > 2) {
      this.servHttp.getcustomer().subscribe((data: CustomerIn[]) => {
        this.val = data.filter(
          (item) =>
            item.customer_name.toLowerCase().includes(value.toLowerCase()) ||
            item.customer_surname.toLowerCase().includes(value.toLowerCase())
        );
        this.items = this.val;
        console.log(value);
        console.log(this.val);
      });
    }*/

    // const value = $event.target.value;
    // const lgt = $event.target.value.length;
    //  const values = Object.values(data);
    //  Array.isArray(data);
    console.log(lgt);
    // console.log(this.client.client);
    // tslint:disable-next-line:only-arrow-functions
    /* if (lgt > 1) {
      this.val = this.client.client.filter(
   (item) =>
     item.customer_name.toLowerCase().includes(value.toLowerCase()) ||
     item.customer_surname.toLowerCase().includes(value.toLowerCase())
 );
 this.items = this.val;
 console.log(value);
 console.log(this.val);
  }*/
    // console.log(values);
  }

  selectuser(item: CustomerIn) {
    this.registerForm.get('costumer_name').setValue(item.customer_name);
    this.registerForm.get('costumer_id').setValue(item.id);
    this.cstid = item.id;
    this.items = [];
    this.recStyle = false;
  }

  autocompleteRec($event) {
    const value = $event.target.value;
    const list = this.servHttp
      .getreciever(this.cstid)
      .subscribe((data: RecieverIn[]) => {
        this.val = data.filter(
          (item) =>
            item.receiver_name.toLowerCase().includes(value.toLowerCase()) ||
            item.receiver_surname.toLowerCase().includes(value.toLowerCase())
        );
        this.items = this.val;
        console.log(value);
        console.log(this.val);
      });
  }

  selectrecei(item: RecieverIn) {
    // this.registerForm.get('costumer_name').setValue( this.valeurcst)
    this.registerForm.get('recepteur').setValue(item.receiver_name);
    this.registerForm.get('receiver_id').setValue(item.id);
    this.items = [];
  }

  selectStand(item: StandardIN) {
    this.registerForm.get('packet_price').setValue(item.price_standard);
    this.registerForm.get('packet_title').setValue(item.name_standard);
    this.standard = [];
    this.tab.push(this.registerForm.value);
    this.prixGroup = Math.round(
      this.registerForm.get('packet_price').value *
        this.registerForm.get('number').value
    );
    this.registerForm.get('total').setValue(this.prixGroup);
    this.TabmontantTotal.push(this.registerForm.get('total').value);
    this.montantTotal = this.TabmontantTotal.reduce((acc, x) => acc + x);
    this.registerForm.get('montantTotal').setValue(this.montantTotal);
    this.tabnbrcolis.push(Number(this.registerForm.get('number').value));
    this.nbrcolis = this.tabnbrcolis.reduce((acc, x) => acc + x);
    this.codeId = this.registerForm.get('costumer_id').value;
    this.servHttp.custcat(this.codeId).subscribe(
      (response: CustomerIn) => {
        console.log(this.codeId);
        console.log(response);
        if (response.reduction_value !== 0 && response.augmentation === 0) {
          this.reduction = response.reduction_value;
          this.augmentation = 0;
          console.log(this.reduction);
        } else if (
          response.reduction_value === 0 &&
          response.augmentation !== 0
        ) {
          this.reduction = 0;
          this.augmentation = response.augmentation;
        } else if (
          response.reduction_value === 0 &&
          response.augmentation === 0
        ) {
          if (response.category_id == null) {
            this.reduction = 0;
            this.augmentation = 0;
          } else {
            this.reduction = response.categorie.category_reduction_value;
            this.augmentation = response.categorie.category_augmentation;
          }
        }
        if (this.reduction === 0 && this.augmentation === 0) {
          this.montantBon = this.montantTotal;
        } else if (this.reduction !== 0 && this.augmentation === 0) {
          this.montantBon = Math.round(
            this.montantTotal - (this.montantTotal * this.reduction) / 100
          );
        } else if (this.reduction === 0 && this.augmentation !== 0) {
          this.montantBon = Math.round(
            this.montantTotal + (this.montantTotal * this.augmentation) / 100
          );
        }
        console.log(this.montantBon);
        console.log(this.augmentation);
        this.registerForm.get('MTtotal').setValue(this.montantBon);
        this.registerForm.get('augmentation').setValue(this.augmentation);
        this.registerForm.get('reduction').setValue(this.reduction);
        this.registerForm.get('Rest').setValue(this.montantBon);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.montantBon);
    this.registerForm.get('MTtotal').setValue(this.montantBon);
    this.registerForm.get('augmentation').setValue(this.augmentation);
    this.registerForm.get('reduction').setValue(this.reduction);
    this.registerForm.get('Rest').setValue(this.montantBon);
  }
  clearSignature(data) {
    data.clear();
    this.signatureImg = null;
  }

  drawComplete(data) {
    const base64Data = data.toDataURL();
    this.signatureImg = base64Data;
    console.log(this.signatureImg);
  }
  lien() {
    this.router.navigate(['commands/editcolis']);
  }
  async openModal2() {
    const modal = await this.modal.create({
      component: RecieverPage,
      cssClass: 'my-custom-class',
      componentProps: { Idclt: this.registerForm.get('costumer_id').value },
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.dataReturned = modelData.data;
        this.registerForm.get('recepteur').setValue(this.dataReturned.name);
        this.registerForm.get('receiver_id').setValue(this.dataReturned.id);
        console.log(this.dataReturned.name);
        console.log(this.dataReturned.id);
        console.log('Modal Data : ' + modelData.data);
      }
    });
    return await modal.present();
  }
  async openModal() {
    const modal = await this.modal.create({
      component: CustomerPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.dataReturned = modelData.data;
        this.registerForm.get('costumer_name').setValue(this.dataReturned.name);
        this.registerForm.get('costumer_id').setValue(this.dataReturned.id);
        console.log(this.dataReturned.name);
        console.log(this.dataReturned.id);
        console.log('Modal Data : ' + modelData.data);
      }
    });
    this.recStyle = true;
    return await modal.present();
  }
  async lie() {
    const tab = this.tab;
    const mont = this.montantBon;
    //  const montantcolis = this.registerForm.get('packet_price');
    // const soe = this.registerForm.get('total').value;
    const modal = await this.modal.create({
      component: EditcolisPage,
      cssClass: 'my-custom-class',
      componentProps: { Idclt: tab, MTB: mont },
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.dataReturned = modelData.data;
        this.registerForm.get('number').setValue(0);
        this.nbrcolis = this.dataReturned.nbrfinal;
        this.montantBon = this.dataReturned.newMtb;
        console.log(this.dataReturned.newMtb);
        if (this.dataReturned.newMtb !== undefined) {
          this.registerForm.get('MTtotal').setValue(this.montantBon);
          this.registerForm.get('Rest').setValue(this.montantBon);
        }
        /* this.TabmontantTotal.push(this.registerForm.get('total').value);
        this.montantTotal = this.TabmontantTotal.reduce((acc, x) => acc + x);
        this.registerForm.get('montantTotal').setValue(this.montantTotal);*/
        console.log(this.dataReturned.newtable);
        console.log('Modal Data : ' + modelData.data);
      }
    });
    return await modal.present();
  }
  calculRest() {
    const value = this.calculMontant();
    this.Rest = this.montantBon - value;
    this.registerForm.get('Rest').setValue(this.Rest);
    if (this.Rest < 0) {
      this.color = 'danger';
    } else {
      this.color = 'primary';
    }
  }
  calculMontant() {
    const nbrcolis =
      Number(this.registerForm.get('espece').value) +
      Number(this.registerForm.get('Cheque').value) +
      Number(this.registerForm.get('Cartebleue').value) +
      Number(this.registerForm.get('Virementbancaire').value);
    return nbrcolis;
  }
  addata() {
    this.servHttp.getcustomer().subscribe((data: CustomerIn[]) => {
      this.storage.set('k', data);
    });
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}