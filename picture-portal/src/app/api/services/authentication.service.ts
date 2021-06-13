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

  constructor(config: ApiConfiguration, http: HttpClient, private store: Store) {
    super(config, http);
  }

  login(userName: string, password: string) : Observable<{user: PortalUser, token: string}>{
    return this.http.post<any>(`${this.rootUrl}/api/User/Login`, { userName, password})
      .pipe(map(res => res));
  }

  register(userName: string, mail: string, password: string) {
    return this.http.post<any>(`${this.rootUrl}/api/User/Signup`, { userName, mail, password})
    .pipe(map(res => res));
  }

  logout() {
    return of(null);
  }
}
