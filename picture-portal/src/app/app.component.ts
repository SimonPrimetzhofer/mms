import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
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
      { text: "Edit" }
  ];

  isLoggedIn = false;
  menuVisible = false;

  constructor(
    private router: Router,
    private store: Store,
    private cd: ChangeDetectorRef) {
      // check if user is admin
      router.events
      .pipe(filter(e => e instanceof RouterEvent))
      .subscribe(e => {
        console.log("Reload portal page")
        if ( this.tabs.length < 3 && !!this.user?.isAdmin ) {
          this.tabs.push({ text: 'Admin-Request' });
        }
        else if ( this.tabs.length > 2 && !this.user?.isAdmin) {
          this.tabs.pop();
        }
      });
    }

  ngOnInit(): void {
    // user should be logged in already
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
