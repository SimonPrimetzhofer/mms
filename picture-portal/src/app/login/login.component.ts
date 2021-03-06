import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { PortalState } from '../portal/state/portal.state'
import { Login, Logout } from '../portal/state/portal.state.actions'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(private router: Router, private store: Store) {
    if (this.store.selectSnapshot(PortalState.user)) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.userName = '';
    this.password = '';
  }

  setUserName($event: any) {
    this.userName = $event.value;
  }

  setPassword($event: any) {
    this.password = $event.value;
  }

  loginClick() {
    if (this.password == '' || this.userName == '') {
      return;
    }
    this.store.dispatch(new Login({ password: this.password, userName: this.userName })).subscribe(
      _ => {
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
        this.store.dispatch(new Logout);
      }
    );
  }

  registerClick() {
    this.router.navigate(['/Register']);
  }
}
