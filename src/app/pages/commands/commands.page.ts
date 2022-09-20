
import { Component, OnInit } from '@angular/core';
import { CommandInt } from 'src/app/CommandeIn';
import { AuthService } from 'src/app/services/auth-service';
import { CommandeService } from 'src/app/services/commande-service';
import { ToastService } from 'src/app/services/toast-service';


@Component({
  selector: 'app-commands',
  templateUrl: './commands.page.html',
  styleUrls: ['./commands.page.scss'],
})
export class CommandsPage implements OnInit {
  commands: CommandInt[];
  totalCmds: number;
  // tslint:disable-next-line:ban-types
  cmdid: Number;
  filterTerm: string;

  currentCmd = null;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  // utilities
  zoneType = 'password';
  commandIcon = 'assets/imgs/icons/command-icon.png';
  selectedCmd: CommandInt;
  user: any = {};
  progressBar = false;

  constructor(
    private servHttp: CommandeService,
    private toastservice: ToastService,

    private authService: AuthService

  ) {}

  ngOnInit() {
    this.authService.getlocal();
    this.activatedProgressBar();
    this.user = JSON.parse(localStorage.getItem('user')).data;

    this.fetchCmds(this.user.id);
  }

  ionViewWillEnter() {
    this.authService.getlocal();
  }


  fetchCmds(id): void {
    this.servHttp.getAll(id).subscribe(
      (data: CommandInt[]) => {
       // this.loading.dismiss();
        this.activatedProgressBar();
        this.commands = data;
        this.totalCmds = data.length;
      },
      (error) => {
        this.activatedProgressBar();
        this.toastservice.presentAlertConfirmPerso(
          'Alerte !',
          'Une erreur s\'est produite veillez réessayer plus tard'
        );
        console.log(error);
      }
    );
  }
  refresh()
  {

  }

  onTableDataChange(event) {
    this.page = event;
    this.fetchCmds(this.user.id);
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchCmds(this.user.id);
  }

  activatedProgressBar() {
    this.progressBar = !this.progressBar;
  }


  doRefresh(event) {
    this.user = JSON.parse(localStorage.getItem('user')).data;
    this.fetchCmds(this.user.id);
    this.activatedProgressBar();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
