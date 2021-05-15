import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { PictureService } from 'src/app/api/services';
import { PictureEntry } from '../../api/models/picture-entry';
import { LoadPictures } from './portal.state.actions';

export interface PortalStateModel {
    pictures: PictureEntry[];
}

@State<PortalStateModel>({
    name: 'portal',
    defaults: {
        pictures: []
    }
})
@Injectable()
export class PortalState {

    constructor(private pictureService: PictureService) {}

    @Selector()
    static pictures(state: PortalStateModel) {
        return state.pictures;
    }

    @Action(LoadPictures)
    async loadPictures(ctx: StateContext<PortalStateModel>, action: LoadPictures) {
        const pictures = await this.pictureService.pictureGet().toPromise();
        ctx.patchState(produce(ctx.getState(), draft => {
            draft.pictures = pictures;
        }));
    }
}