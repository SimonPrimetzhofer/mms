import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { PortalState } from '../portal/state/portal.state'
import { Login, Register, Logout } from '../portal/state/portal.state.actions'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userName: string;
  password: string;
  email: string;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.userName = '';
    this.password = '';
    this.email = '';
  }

  setUserName($event: any) {
    this.userName = $event.value;
  }

  setPassword($event: any) {
    this.password = $event.value;
  }

  setEmail($event: any) {
    this.email = $event.value;
  }

  registerClick() {
    // console.log(this.password + " register " + this.userName);
    if (this.password == '' || this.userName == '') {
      return;
    }
    this.store.dispatch(new Register({ password: this.password, email: this.email, userName: this.userName })).subscribe(
      _ => {
        console.log('register successfull');
        console.log(this.store.selectSnapshot(PortalState.user))
        this.router.navigate(['/']);
      },
      error => {
        console.log('register failed');
        console.log(error);
        this.store.dispatch(new Logout);
      }
    );
  }
}
