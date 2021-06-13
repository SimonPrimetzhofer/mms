import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import ImageEditor from 'tui-image-editor';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngxs/store';
import { UploadImage } from '../portal/state/portal.state.actions';
import { PortalState } from '../portal/state/portal.state';

export interface DialogData {
  name: string;
  tags: string[];
}

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit, AfterViewInit {

  templates = [];
  editor: ImageEditor;
  name = "";
  tags = "";

  @ViewChild('container') container: ElementRef;

  constructor(public dialog: MatDialog,
    private store: Store) { }

  ngOnInit(): void {
    this.loadMemeTemplates()
  }

  loadMemeTemplates(): void {
    // TODO: Not use any pictures from Internet, but use the REST
    this.templates.push("https://indianmemetemplates.com/wp-content/uploads/Quiz-Kid.jpg")
    this.templates.push("https://www.meme-arsenal.com/memes/879b7d8fa64a2334700021391ee14d88.jpg")
    this.templates.push("https://64.media.tumblr.com/0329822876098b3fe73a8ef6ea0628fb/bfdb670f69f69133-83/s1280x1920/9252eb69a3f9d66092944eb1d2598a8c1801bc69.jpg")
    this.templates.push("https://i.imgflip.com/2mwc77.jpg")
    this.templates.push("https://i.imgflip.com/u0pf0.jpg")
  }

  setTemplateActive(template: string): void {
    this.editor.loadImageFromURL(template, template.split("/")[template.split("/").length-1]);
  }

  upload(): void {
    const dialogRef = this.dialog.open(EditingDialog, {
      width: "25%",
      data: {name: this.name, tags: this.tags}
    });

    dialogRef.afterClosed().subscribe(res => {
      const base64Meme = this.editor.toDataURL().split(",")[1]

      // TODO: POST-Aufruf
      this.store.dispatch(new UploadImage({
        creator: null, 
        creationDate: new Date(),
        image: base64Meme,
        title: res.name,
        tag: res.tags
      }));
    })
  }

  ngAfterViewInit(): void {
    this.editor = new ImageEditor(this.container.nativeElement, {
      cssMaxHeight: 1000,
      cssMaxWidth: 1000,
      usageStatistics: false,
      includeUI: {
        loadImage: {
          path: this.templates[0],
          name: 'SampleImage'
        },
        uiSize: {
          width: '100%',
          height: '1000px'
        }
      }
    })
  }
}

@Component({
  selector: 'editing-dialog',
  templateUrl: 'editing.dialog.html',
})
export class EditingDialog {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public dialogRef: MatDialogRef<EditingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.data.tags.push(value);
    }

    event.input.value = "";
  }

  remove(fruit: string): void {
    const index = this.data.tags.indexOf(fruit);

    if (index >= 0) {
      this.data.tags.splice(index, 1);
    }
  }
}