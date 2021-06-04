import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PictureEntry } from '../api/models';
import { PortalState } from './state/portal.state';
import { LoadPictures } from './state/portal.state.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  get pictures(): PictureEntry[] {
    return this.store.selectSnapshot(PortalState.pictures);
  }

  constructor(private store: Store,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadPictures());
  }

  openDetail($event: any) {
    // TODO: open bigger view with metadata
    console.log($event);
  }

  convertBase64ToImage(base64Image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64Image);
  }

}
