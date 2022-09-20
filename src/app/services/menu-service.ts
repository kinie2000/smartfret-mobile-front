import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class MenuService {
  user: any = {};
  constructor() {}

  getDataForTheme() {
    return {
      // 'imgLogo': 'assets/imgs/logo/login.png',
      image: 'assets/imgs/logo_2.png',
      title: 'SmartFret Transport',
      description: '',
      telephone: '(+33)0139157553 ',
      email: 'info@smartfret.com',
    };
  }

  // * Data Set for main menu
  getAllTheme() {
    let show = false;
    if (!localStorage.getItem('user')) {
      this.user.profil = null;
    } else {
      this.user = JSON.parse(localStorage.getItem('user')).data;
      show = true;
    }
    return [
      {
        url: 'commands',
        title: 'Commandes',
        theme: 'commandes',
        icon: 'chevron-forward-circle',
        listView: false,
        component: '',
        singlePage: false,
        show: this.user.profil === 'admin' ? false : true,
      },
      {
        url: 'colis',
        title: 'Suivre Un colis',
        theme: 'commandes',
        icon: 'chevron-forward-circle',
        listView: false,
        component: '',
        singlePage: false,
        show: this.user.profil === 'admin' ? false : true,
      },
      {
        url: 'retreivement',
        title: 'Demander un enlèvement',
        theme: 'commandes',
        icon: 'chevron-forward-circle',
        listView: false,
        component: '',
        singlePage: false,
        show: this.user.profil === 'admin' ? false : true,
      },
      {
        url: 'box',
        title: 'Commander un emballage',
        theme: '',
        icon: 'chevron-forward-circle',
        listView: false,
        component: '',
        singlePage: false,
        show: this.user.profil === 'admin' ? false : true,
      },
      {
        url: 'reclamation',
        title: 'Demander à être appelé',
        theme: 'commandes',
        icon: 'chevron-forward-circle',
        listView: false,
        component: '',
        singlePage: false,
        show: this.user.profil === 'admin' ? false : true,
      },
      {
        url: 'commands/newcmd',
        title: 'nouvelle commande',
        theme: 'new commands',
        icon: 'chevron-forward-circle',
        listView: false,
        component: '',
        singlePage: false,
        show: this.user.profil === 'admin' ? true : false,
      },
    ];
  }
}
