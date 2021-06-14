import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PictureEntry } from '../api/models';
import { PortalState } from '../portal/state/portal.state';
import { DeletePicture, EditPicture, LoadPictures } from '../portal/state/portal.state.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

  showDetailPopup = false;
  pictureDetail: PictureEntry;
  inEditMode = false;
  pictureUpdateData: { title: string, tag: string };



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
  }

  openDetail($event: any) {
    this.showDetailPopup = !this.showDetailPopup;
    this.inEditMode = false;
    this.pictureDetail = $event.itemData;
    this.pictureUpdateData = { title: this.pictureDetail.title, tag: this.pictureDetail.tag };
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
        this.inEditMode = false;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  editClick(){
    this.inEditMode = true;
  }

  saveClick(){
    this.store.dispatch(new EditPicture({pictureId: this.pictureDetail.pictureId, pictureEntry:{ pictureId: this.pictureDetail.pictureId, title: this.pictureUpdateData.title, tag: this.pictureUpdateData.tag } })).subscribe(
      _ => {
        window.location.reload();
        this.showDetailPopup = !this.showDetailPopup;
        this.inEditMode = false;
      },
      error => {
        console.log(error);
      }
    );
    this.inEditMode = false;
  }

  cancelClick(){
    this.inEditMode = false;
  }
}
