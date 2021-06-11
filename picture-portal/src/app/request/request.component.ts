import { Component, OnInit } from '@angular/core';
import { RequestService } from '../api/services';
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  details = {
    title: '',
    description: '',
    imageURL: ''
  }

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
  }

  submit(event: Event): void {
    event.preventDefault();
    
    this.requestService.requestPost({
      body: {
        title: this.details.title,
        description: this.details.description,
        relatedPicture: 1,
      }
    }).subscribe(
      () => {
        this.details = {title: '', description: '', imageURL: ''}
        notify("Request submitted.")
      },
      (error) => notify("Error while submitting request: " + error?.message, "error", 5000)
    );
  }
}
