import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PortalUser } from './api/models';
import { PortalState } from './portal/state/portal.state';
import { Logout } from './portal/state/portal.state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  get user(): PortalUser {
    return this.store.selectSnapshot(PortalState.user);
  }

  // tabs are according to route names
  tabs: { text: string }[] = [
      { text: "Pictures" },
      { text: "Edit" },
      { text: "Request" }
  ];

  isLoggedIn = false;
  menuVisible = false;

  constructor(private router: Router,
    private store: Store,
    private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // user should be logged in already
    // check if user is admin
    if(!!this.user?.isAdmin) {
      this.tabs.push({ text: 'Admin-Request' });
    }
    this.cd.detectChanges();
    this.isLoggedIn = this.store.selectSnapshot(PortalState.isAuthenticated);
  }

  settingsClick() {
    this.menuVisible = !this.menuVisible;
    this.isLoggedIn = this.store.selectSnapshot(PortalState.isAuthenticated)
  }

  selectTab($event: any) {
    this.router.navigate([$event.itemData.text]);
  }

  filterPictures($event: any) {
    this.router.navigate(['Pictures', $event.value]);
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['']);
  }

  login() {
    this.router.navigate(['/Login']);
  }

}
