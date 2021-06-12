import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { PictureEntry } from 'src/app/api/models';
import { PortalUser } from 'src/app/api/models';
import { PictureService } from 'src/app/api/services/picture.service';
import { PortalState } from 'src/app/portal/state/portal.state';
import { LoadPictures } from 'src/app/portal/state/portal.state.actions';
import notify from 'devextreme/ui/notify';


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

  get pictures(): PictureEntry[] {
    return this.store.selectSnapshot(PortalState.pictures);
  }

  constructor(private store: Store,
    private sanitizer: DomSanitizer, private pictureService: PictureService) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadPictures());
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
    // const user = this.store.selectSnapshot(PortalState.user)
    this.picture = {creationDate: new Date().toISOString(), creator: null, title: this.pictureTitle, tag: this.pictureTag, image: this.url};

    this.pictureService.picturePost({body: this.picture}).subscribe();
    this.popupVisible = false;
    this.pictureService.pictureGet().subscribe(_ => this.store.dispatch(new LoadPictures()));
  }

  editClick() {
    notify('Edit image...');
    this.pictureService.picturePut({ id: this.selectedPicture.pictureId, body: { creationDate: this.selectedPicture.creationDate, creator: null,  tag: this.pictureTag, title: this.pictureTitle, image: this.selectedPicture.image} }).subscribe();
    this.pictureService.pictureGet().subscribe(_ => this.store.dispatch(new LoadPictures()));
    this.popupEditRemoveVisible = false;
  }

  deleteClick() {
    notify('Delete image...');
    this.pictureService.pictureDelete({id: this.selectedPicture.pictureId}).subscribe();
    this.pictureService.pictureGet().subscribe(_ => this.store.dispatch(new LoadPictures()));
    this.popupEditRemoveVisible = false;
  }
}
