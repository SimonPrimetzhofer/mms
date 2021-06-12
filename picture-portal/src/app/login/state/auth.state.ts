import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { PortalUser } from 'src/app/api/models';
import { AuthenticationService } from 'src/app/api/services/authentication.service';
import { Login, Logout } from './auth.state.actions';

export interface AuthStateModel {
    user: PortalUser;
    token: string;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        user: null,
        token: null
    }
})
@Injectable()
export class AuthState {

    constructor(private authenticationService: AuthenticationService) { }

    @Selector()
    static user(state: AuthStateModel) {
        return state.user;
    }

    @Selector()
    static token(state: AuthStateModel) {
        return state.token;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel) {
        return !!state.token && state.user;
    }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        let response = this.authenticationService.login(action.payload.userName, action.payload.password).pipe(
            tap((result: { user: PortalUser, token: string }) => {
                ctx.patchState({
                    user: result.user,
                    token: result.token
                });
            })
        );
        return response;
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>, action: Logout) {
        return this.authenticationService.logout().pipe(
            tap(() => {
                ctx.patchState({
                    user: null,
                    token: null
                });
            })
        );
    }
}
