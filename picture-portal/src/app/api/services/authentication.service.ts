import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { PortalUser } from '../models/portal-user';
import { PortalState } from '../../portal/state/portal.state';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  private currentUserSubject: BehaviorSubject<PortalUser>;
  public currentUser: Observable<PortalUser>;

  constructor(config: ApiConfiguration, http: HttpClient, private store: Store) {
    super(config, http);
    this.currentUserSubject = new BehaviorSubject<PortalUser>(this.user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get user(): PortalUser {
    return this.store.selectSnapshot(PortalState.user);
  }

  public get currentUserValue(): PortalUser {
    return this.currentUserSubject.value;
  }

  validateToken(token: String){
    return true;
    // send api request to validate token;
  }

  login(username: string, password: string) {
    console.log("login auth service");
    return of({token:"token",user:{ mail: "string", password: "string", pictureEntries: [], username: "string"}})
    return this.http.post<any>(`${this.rootUrl}/users/authenticate`, { username, password })
      .pipe(map(res => res.body));
  }

  logout() {
    return of(null);
  }
}
