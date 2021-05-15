import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PictureEntry } from '../api/models';
import { PortalState } from './state/portal.state';
import { LoadPictures } from './state/portal.state.actions';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  get pictures(): PictureEntry[] {
    return this.store.selectSnapshot(PortalState.pictures);
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadPictures());
  }

  openDetail($event: any) {
    // TODO: ...
  }

}
