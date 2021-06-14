import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import produce from 'immer';
import { PortalUser } from 'src/app/api/models';
import { PictureService, AuthenticationService } from 'src/app/api/services';
import { PictureEntry } from '../../api/models/picture-entry';
import { LoadPictures, SetUser, Login, Register, Logout, UploadImage, LoadUserPictures, DeletePicture, EditPicture } from './portal.state.actions';
import { state } from '@angular/animations';

export interface PortalStateModel {
    pictures: PictureEntry[];
    userPictures: PictureEntry[];
    user: PortalUser;
    token: string;
}

@State<PortalStateModel>({
    name: 'portal',
    defaults: {
        pictures: null,
        userPictures: null,
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
    static userPictures(state: PortalStateModel) {
        return state.userPictures;
    }

    @Selector()
    static user(state: PortalStateModel) {
        return state.user;
    }

    @Action(LoadPictures)
    async loadPictures(ctx: StateContext<PortalStateModel>, action: LoadPictures) {
        const pictures = await (!!action.tag ? this.pictureService.pictureGet_2({ tag: action.tag }) : this.pictureService.pictureGet()).toPromise();
        ctx.patchState(produce(ctx.getState(), draft => {
            draft.pictures = pictures;
        }));
    }

    @Action(LoadUserPictures)
    async loadUserPictures(ctx: StateContext<PortalStateModel>, action: LoadUserPictures) {
        const pictures = await (!!action.userId ? this.pictureService.pictureGet_1({ userId: action.userId }) : this.pictureService.pictureGet()).toPromise();
        ctx.patchState(produce(ctx.getState(), draft => {
            draft.userPictures = pictures;
        }));
    }

    @Action(EditPicture)
    async editPicture(ctx: StateContext<PortalStateModel>, action: EditPicture) {
        await this.pictureService.picturePut({ id: action.payload.pictureId, body: action.payload.pictureEntry }).toPromise();
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

    @Action(DeletePicture)
    async deletePicture(ctx: StateContext<PortalStateModel>, action: DeletePicture) {
        await this.pictureService.pictureDelete({ id: action.pictureId }).toPromise();
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