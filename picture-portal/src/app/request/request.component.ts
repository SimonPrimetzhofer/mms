import { Component, OnInit } from '@angular/core';
import { RequestService } from '../api/services';
import notify from 'devextreme/ui/notify';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  details = {
    title: '',
    description: '',
    image: ''
  }

  origin = location.origin;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.details.image = params.id);
  }

  submit(event: Event): void {
    event.preventDefault();
    
    this.requestService.requestPost({
      body: {
        title: this.details.title,
        description: this.details.description,
        relatedPicture: Number(this.details.image),
      }
    }).subscribe(
      () => {
        this.router.navigate(['/']);
        notify('Request submitted.')
      },
      (error) => notify('Error while submitting request: ' + error?.message, 'error', 5000)
    );
  }
}
