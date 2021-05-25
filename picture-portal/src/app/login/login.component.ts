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

  userName;
  password;

  constructor(private router: Router, private store: Store) {  
    if(this.store.selectSnapshot(AuthState.user)) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  loginClick(){
    this.store.dispatch(new Login({ password: this.password, username: this.userName})).subscribe(
      _ => {
        console.log('login successfull');
        this.router.navigate(['/Login']);
      },
      error => {
        console.log('login failed');
        console.log(error);
        this.store.dispatch(new Logout);
      }
    );
    console.log(this.store.selectSnapshot(AuthState.user)); // Log
  }

  cancelClick(){
    this.store.dispatch(new Logout);
    console.log(this.store.selectSnapshot(AuthState.user)); // Log
    this.router.navigate['/'];
  }

}
