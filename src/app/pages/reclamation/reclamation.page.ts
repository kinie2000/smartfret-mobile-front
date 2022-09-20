import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { CommandeService } from 'src/app/services/commande-service';
import { ToastService } from 'src/app/services/toast-service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.page.html',
  styleUrls: ['./reclamation.page.scss'],
})
export class ReclamationPage implements OnInit {
  layoutData: any = {};
  data: any = {};
  editform: FormGroup;
  mobnumPattern = '^[6]+[2|5|6|7|8|9]+[0-9]{6}$';
  user: any;
  progressBar = false;
  constructor(
    private fb: FormBuilder,
    private toastservice: ToastService,
    private cmdService: CommandeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getlocal();
    this.layoutData = this.getLayoutData();
    this.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data
      : null;
    this.intForm();
  }

  intForm() {
    this.editform = this.fb.group({
      tel: ['', [Validators.pattern(this.mobnumPattern), Validators.required]],
      code: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.authService.getlocal();
  }

  getLayoutData() {
    return {
      title: 'Smart Fret Transport',
      subtitle: 'Transport & Logistique',
      context:
        'Si vous voulez être contacté par nous, renseignez les informations ci-dessous.',
      description: 'Description des colis',
      submit: 'Appelez-moi',
      logo: 'assets/imgs/logo_2.png',
    };
  }

  onSubmitFunc() {
    let obj = {
      id: this.user ? this.user.id : null,
      number:
        this.editform.get('code').value + ' ' + this.editform.get('tel').value,
      demande: 'appel',
    };
    this.cmdService.commandeServiceClient(obj).subscribe(
      (res: any) => {
        this.toastservice
          .presentAlertConfirmPerso(
            'Service Client',
            'Votre demande a bien été reçu. <br> Nous vous contacterons dans les plus brefs délais !!!'
          )
          .then((res) => {
            this.activatedProgressBar();
          });
      },
      (error) => {
        this.toastservice.presentAlertConfirmPerso(
          'Alerte !',
          'Une erreur s\'est produite veillez réessayer plus tard'
        );
        this.activatedProgressBar();
        console.log(error);
      }
    );
  }

  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }
}
