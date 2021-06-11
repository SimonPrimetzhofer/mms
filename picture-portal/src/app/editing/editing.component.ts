import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ImageEditor from 'tui-image-editor';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit, AfterViewInit {

  @ViewChild('container') container: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    new ImageEditor(this.container.nativeElement, {
      cssMaxHeight: 800,
      cssMaxWidth: 1000,
      usageStatistics: false,
      includeUI: {
        uiSize: {
          width: '100%',
          height: '800px'
        }
      }
    })
  }

}
