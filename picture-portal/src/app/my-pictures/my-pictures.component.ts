import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { PictureEntry } from 'src/app/api/models';
import { PortalUser } from 'src/app/api/models';
import { PictureService } from 'src/app/api/services/picture.service';
import { PortalState } from 'src/app/portal/state/portal.state';
import { EditPicture, LoadPictures, LoadUserPictures, UploadImage } from 'src/app/portal/state/portal.state.actions';
import notify from 'devextreme/ui/notify';
import { createAotUrlResolver } from '@angular/compiler';
import dxTileView from 'devextreme/ui/tile_view';


@Component({
  selector: 'app-my-pictures',
  templateUrl: './my-pictures.component.html',
  styleUrls: ['./my-pictures.component.scss']
})
export class MyPicturesComponent implements OnInit {
  title = 'Upload picture'
  fileName = '';
  popupVisible = false;
  popupEditRemoveVisible = false;
  picture: PictureEntry;
  pictureTitle: string;
  pictureTag: string;
  url: string;
  selectedPicture: PictureEntry;
  @ViewChild(dxTileView) tileView: dxTileView;

  get pictures(): PictureEntry[] {
    return this.store.selectSnapshot(PortalState.userPictures);
  }

  constructor(private store: Store,
    private sanitizer: DomSanitizer, private pictureService: PictureService) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadUserPictures(this.store.selectSnapshot(PortalState.user)?.userId.toString()));
  }

  openDetail(e) {
    this.popupEditRemoveVisible = true;
    this.selectedPicture = e.itemData;
    this.pictureTitle = this.selectedPicture.title;
    this.pictureTag = this.selectedPicture.tag;
  }

  convertBase64ToImage(base64Image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64Image);
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result.toString());
      this.url = reader.result.toString().split(',')[1];
    };
  }

  click = e => {
      this.popupVisible = true;
  }

  uploadClick() {
    notify('Upload image...');

    this.store.dispatch(new UploadImage({
      creatorId: this.store.selectSnapshot(PortalState.user)?.userId || 1, 
      creationDate: new Date(),
      image: this.url,
      title: this.pictureTitle,
      tag: this.pictureTag
    }));
    this.popupVisible = false;
    this.pictureService.pictureGet_1({ userId: this.store.selectSnapshot(PortalState.user)?.userId.toString() }).subscribe(_ => this.store.dispatch(new LoadUserPictures(this.store.selectSnapshot(PortalState.user)?.userId.toString())));
    this.tileView.getDataSource();
    this.tileView._refresh();
  }

  editClick() {
    notify('Edit image...');
    console.log(this.selectedPicture.creatorUserId);
    this.store.dispatch(new EditPicture({
      pictureId: this.selectedPicture.pictureId,
      pictureEntry: {
        pictureId: this.selectedPicture.pictureId,
        creationDate: this.selectedPicture.creationDate,
        creatorId: this.selectedPicture.creatorUserId,
        title: this.pictureTitle,
        tag: this.pictureTag
      }
    }));
    
    this.popupEditRemoveVisible = false;
    this.pictureService.pictureGet_1({ userId: this.store.selectSnapshot(PortalState.user)?.userId.toString() }).subscribe(_ => this.store.dispatch(new LoadUserPictures(this.store.selectSnapshot(PortalState.user)?.userId.toString())));
    this.tileView.getDataSource();
    this.tileView._refresh();
  }

  deleteClick() {
    notify('Delete image...');
    this.pictureService.pictureDelete({id: this.selectedPicture.pictureId}).subscribe();
    this.popupEditRemoveVisible = false;
    this.pictureService.pictureGet_1({ userId: this.store.selectSnapshot(PortalState.user)?.userId.toString() }).subscribe(_ => this.store.dispatch(new LoadUserPictures(this.store.selectSnapshot(PortalState.user)?.userId.toString())));
    this.tileView.getDataSource();
    this.tileView._refresh();
  }
}
