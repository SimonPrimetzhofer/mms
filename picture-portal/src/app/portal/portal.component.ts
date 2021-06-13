import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PictureEntry } from '../api/models';
import { PortalState } from './state/portal.state';
import { LoadPictures } from './state/portal.state.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  showDetailPopup = false;
  pictureDetail: PictureEntry;

  get pictures(): PictureEntry[] {
    return this.store.selectSnapshot(PortalState.pictures);
  }

  constructor(private store: Store,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadPictures());

    this.activatedRoute.params.subscribe(params => this.store.dispatch(new LoadPictures(params.filter)));
  }

  openDetail($event: any) {
    this.showDetailPopup = !this.showDetailPopup;
    this.pictureDetail = $event.itemData;
  }

  convertBase64ToImage(base64Image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64Image);
  }

  convertStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

}
