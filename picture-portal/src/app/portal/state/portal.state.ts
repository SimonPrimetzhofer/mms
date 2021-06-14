import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import produce from 'immer';
import { PortalUser } from 'src/app/api/models';
import { PictureService, AuthenticationService } from 'src/app/api/services';
import { PictureEntry } from '../../api/models/picture-entry';
import { LoadPictures, SetUser, Login, Register, Logout, UploadImage } from './portal.state.actions';

export interface PortalStateModel {
    pictures: PictureEntry[];
    user: PortalUser;
    token: string;
}

@State<PortalStateModel>({
    name: 'portal',
    defaults: {
        pictures: null,
        user: null,
        token: null
    }
})
@Injectable()
export class PortalState {

    constructor(private pictureService: PictureService, private authenticationService: AuthenticationService) {}

    @Selector()
    static pictures(state: PortalStateModel) {
        return state.pictures;
    }

    @Selector()
    static user(state: PortalStateModel) {
        return state.user;
    }

    @Action(LoadPictures)
    async loadPictures(ctx: StateContext<PortalStateModel>, action: LoadPictures) {
        const pictures = await (!!action.tag ? this.pictureService.pictureGet_1({ tag: action.tag }) : this.pictureService.pictureGet()).toPromise();
        ctx.patchState(produce(ctx.getState(), draft => {
            draft.pictures = pictures;
        }));
    }

    @Action(SetUser)
    setUser(ctx: StateContext<PortalStateModel>, action: SetUser) {
        ctx.patchState(produce(ctx.getState(), draft => {
            draft.user = action.user;
        }));
    }

    @Action(UploadImage)
    async uploadImage(ctx: StateContext<PortalStateModel>, action: UploadImage) {
        await this.pictureService.picturePost({body: action.pictureEntry}).toPromise();
    }

    @Selector()
    static token(state: PortalStateModel) {
        return state.token;
    }

    @Selector()
    static isAuthenticated(state: PortalStateModel) {
        return !!state.token && !!state.user;
    }

    @Action(Login)
    login(ctx: StateContext<PortalStateModel>, action: Login) {
        // console.log("state login...")
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

    @Action(Register)
    register(ctx: StateContext<PortalStateModel>, action: Register) {
        // console.log("state register...")
        let response = this.authenticationService.register(action.payload.userName, action.payload.email, action.payload.password).pipe(
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
    logout(ctx: StateContext<PortalStateModel>, action: Logout) {
        // console.log("state logout...")
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