import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoandingServiceService {

  constructor(private loadingcontroller:LoadingController) { }
  async presentLoading()
  {
    const loading=await this.loadingcontroller.create({
      message:"please wait",
      duration:2000
    });
    await loading.present();
  }
  dismiss()
  {
    this.loadingcontroller.dismiss;
 
  }
}
