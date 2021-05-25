import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
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
    isAuthenticated(state: AuthStateModel) {
        return !!state.token && this.authenticationService.validateToken(state.token);
    }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        console.log("atate login")
        return this.authenticationService.login(action.payload.username, action.payload.password).pipe(
            tap((result) => {
                ctx.patchState({
                    user: result.user,
                    token: result.token
                });
            })
        );
    }



    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>, action: Logout) {
        console.log("atate logout")
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
