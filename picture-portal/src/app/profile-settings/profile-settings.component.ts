import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/services';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  details = {
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  passwordComparison = () => {
    return this.details.newPassword;
  }


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.userGet()
      .subscribe(user => {
        this.details.username = user.username;
        this.details.email = user.mail;
      });
  }
  
  update(event: Event): void {
    event.preventDefault();

    this.userService.userPost({
      body: {
        mail: this.details.email,
        username: this.details.username
      }
    }).subscribe(
      () => notify('User settings updated!'),
      err => notify('Error while updating settings: ' + err?.message, 'error', 5000));
  }

  updatePassword(event: Event): void {
    event.preventDefault();

    this.userService.userPost_1({
      body: {
        oldPassword: this.details.oldPassword,
        newPassword: this.details.newPassword,
      }
    }).subscribe(
      () => notify('User settings updated!'),
      err => notify('Error while updating settings: ' + err?.message, 'error', 5000));
  }

  deleteUser(event: Event): void {
    event.preventDefault();

    this.userService.userDelete()
      .subscribe(
        () => notify('User deleted!'),
        err => notify('Error while deleting user: ' + err?.message, 'error', 5000));
  }
}
