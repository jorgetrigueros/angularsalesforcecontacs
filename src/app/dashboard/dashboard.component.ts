import { Component, OnInit } from '@angular/core';
import { Contact } from '../common/interfaces/contact';
import { ForceService } from '../common/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ForceService],
})
export class DashboardComponent implements OnInit {
  
  contacts: any;
  selectedContact: Contact;
  loggedUser: any;
  loading: any = true;
  
  constructor(private forceService: ForceService) {
    const APP_Id = '3MVG9fTLmJ60pJ5LPJPBb9yUI8itwumlIhuDnRJZM2iAspgnghvL5fCafsThgqkSGrrArDLzI4gu6qRBpoLMn'; // personal
    // const APP_Id = 'xxxxxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx_CbuDx7h9XiCCAC_a.E8fxYThHXFbInes2';  // Berge Dribermule App
    this.forceService.init({
      appId: APP_Id,
      proxyURL: 'https://dev-cors-proxy.herokuapp.com/'
    });
  }

  ngOnInit() {
    if (this.forceService.isLoggedIn()) {
      this.onLogin();
    } else {
      this.loading = false;
    }
  }

  onLogin() {
    this.loading = true;
    this.forceService.login().then(() => {
      this.loading = false;
      this.loggedUser = this.forceService.getUserId();
      console.log('this.loggedUser', this.loggedUser);
      this.getData();
    });
  }

  getData() {
    this.loading = true;
    // Prueba de redireccion a una Url de salesforce dentro de la Org
    // const urlRedirect = 'https://jorgetrigueros-dev-ed.lightning.force.com/lightning/page/home';
    // const urlRedirect = 'https://berge--dribermule.lightning.force.com/lightning/n/External_User_Dashboard';
    // window.location.href= urlRedirect;
    this.forceService.query('select id, firstname, lastname, phone from contact').then(result => {
      this.loading = false;
      this.contacts = (<any>result).records;
    });
  }

  onSelect(contact: Contact) {
      this.selectedContact = contact;
  }

}
