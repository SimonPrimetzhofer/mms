import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState } from './state/auth.state'
import { Login, Logout } from './state/auth.state.actions'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(private router: Router, private store: Store) {
    if (this.store.selectSnapshot(AuthState.user)) {
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
    console.log(this.password + " " + this.userName);
    if (this.password == '' || this.userName == '') {
      return;
    }
    this.store.dispatch(new Login({ password: this.password, userName: this.userName })).subscribe(
      _ => {
        // console.log('login successfull');
        this.router.navigate(['/']);
      },
      error => {
        // console.log('login failed');
        console.log(error);
        this.store.dispatch(new Logout);
      }
    );
  }

  cancelClick() {
    this.store.dispatch(new Logout);
    this.router.navigate['/'];
  }

}
