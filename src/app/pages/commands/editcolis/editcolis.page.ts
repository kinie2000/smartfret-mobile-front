import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Console } from 'console';
import { PaquetInt } from '../../paquetIn';

@Component({
  selector: 'app-editcolis',
  templateUrl: './editcolis.page.html',
  styleUrls: ['./editcolis.page.scss'],
})
export class EditcolisPage implements OnInit {
  // tslint:disable-next-line:no-shadowed-variable
  public tab: PaquetInt;
  public obj;
  public nbrfinal;
  public newMtb;
  @Input() Idclt: Array<PaquetInt> = [];
  @Input() MTB: number;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log(this.Idclt);
    console.log(this.MTB);
    //  console.log(this.Idclt[0].packet_title);
  }
  suprimer(id) {
    // console.log(this.Idclt[id]);
    console.log(id.packet_price);
    this.newMtb = this.MTB - id.packet_price;
    const myIndex = this.Idclt.indexOf(id);
    if (myIndex !== -1) {
      this.Idclt.splice(myIndex, 1);
      console.log(this.Idclt);
    }
    this.nbrfinal = this.Idclt.length;
  }
  async dismiss() {
    this.obj = {
      newtable: this.Idclt,
      nbrfinal: this.nbrfinal,
      newMtb: this.newMtb,
    };
    await this.modalController.dismiss(this.obj);
  }
}
