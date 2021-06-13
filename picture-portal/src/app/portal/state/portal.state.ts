import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { PortalUser } from 'src/app/api/models';
import { PictureService } from 'src/app/api/services';
import { PictureEntry } from '../../api/models/picture-entry';
import { LoadPictures, SetUser, UploadImage } from './portal.state.actions';

export interface PortalStateModel {
    pictures: PictureEntry[];
    user: PortalUser;
}

@State<PortalStateModel>({
    name: 'portal',
    defaults: {
        pictures: null,
        user: null
    }
})
@Injectable()
export class PortalState {

    constructor(private pictureService: PictureService) {}

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
        const pictures = await this.pictureService.pictureGet().toPromise();
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
}