/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PictureEntry } from '../models/picture-entry';
import { RequestItem } from '../models/request-item';
import { RequestItemDto } from '../models/request-item-dto';

@Injectable({
  providedIn: 'root',
})
export class RequestService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation requestGet
   */
  static readonly RequestGetPath = '/api/Request';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<RequestItem>>> {

    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RequestItem>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `requestGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestGet$Plain(params?: {
  }): Observable<Array<RequestItem>> {

    return this.requestGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RequestItem>>) => r.body as Array<RequestItem>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestGet$Response(params?: {
  }): Observable<StrictHttpResponse<Array<RequestItem>>> {

    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RequestItem>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `requestGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestGet(params?: {
  }): Observable<Array<RequestItem>> {

    return this.requestGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RequestItem>>) => r.body as Array<RequestItem>)
    );
  }

  /**
   * Path part for operation requestPost
   */
  static readonly RequestPostPath = '/api/Request';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  requestPost$Plain$Response(params?: {
    body?: RequestItemDto
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PictureEntry>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `requestPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  requestPost$Plain(params?: {
    body?: RequestItemDto
  }): Observable<PictureEntry> {

    return this.requestPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  requestPost$Response(params?: {
    body?: RequestItemDto
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PictureEntry>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `requestPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  requestPost(params?: {
    body?: RequestItemDto
  }): Observable<PictureEntry> {

    return this.requestPost$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

}
