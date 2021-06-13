import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PictureEntry } from '../api/models';
import { PortalState } from '../portal/state/portal.state';
import { DeletePicture, LoadPictures } from '../portal/state/portal.state.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

  showDetailPopup = false;
  pictureDetail: PictureEntry;



  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  get pictures(): PictureEntry[] {
    return this.store.selectSnapshot(PortalState.pictures);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPictures());
    console.log("Admin-request");
    //console.log(this.store.selectSnapshot(PortalState.token)); ///
    //console.log(this.store.selectSnapshot(PortalState.user)); ///
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

  deleteClick() {
    this.store.dispatch(new DeletePicture(this.pictureDetail.pictureId)).subscribe(
      _ => {
        this.showDetailPopup = !this.showDetailPopup;
      },
      error => {
        console.log(error);
      }
    );
  }

}
