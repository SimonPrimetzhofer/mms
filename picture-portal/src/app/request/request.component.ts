import { Component, OnInit } from '@angular/core';
import { RequestService } from '../api/services';
import notify from 'devextreme/ui/notify';

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

  origin = location.origin;

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
        relatedPicture: this.convertURL(this.details.imageURL),
      }
    }).subscribe(
      () => {
        this.details = {title: '', description: '', imageURL: ''}
        notify('Request submitted.')
      },
      (error) => notify('Error while submitting request: ' + error?.message, 'error', 5000)
    );
  }

  convertURL(url: string): number | null {
    url = url.toLowerCase();
    if (!url.startsWith(location.origin.toLowerCase() + '/pictures/')) {
      return null;
    }

    const id = Number(url.substring(location.origin.length + '/pictures/'.length));
    if (Number.isNaN(id)) {
      return null;
    }
    return id;
  }

  checkUrl = async () => {
    return this.convertURL(this.details.imageURL) !== null;
  }
}
