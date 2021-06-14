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
import { PictureEntryDto } from '../models/picture-entry-dto';

@Injectable({
  providedIn: 'root',
})
export class PictureService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation pictureGet
   */
  static readonly PictureGetPath = '/api/Picture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PictureEntry>>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PictureEntry>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pictureGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet$Plain(params?: {
  }): Observable<Array<PictureEntry>> {

    return this.pictureGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PictureEntry>>) => r.body as Array<PictureEntry>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PictureEntry>>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PictureEntry>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pictureGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet(params?: {
  }): Observable<Array<PictureEntry>> {

    return this.pictureGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PictureEntry>>) => r.body as Array<PictureEntry>)
    );
  }

  /**
   * Path part for operation picturePost
   */
  static readonly PicturePostPath = '/api/Picture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `picturePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  picturePost$Plain$Response(params?: {
    body?: PictureEntryDto
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PicturePostPath, 'post');
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
   * To access the full response (for headers, for example), `picturePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  picturePost$Plain(params?: {
    body?: PictureEntryDto
  }): Observable<PictureEntry> {

    return this.picturePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `picturePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  picturePost$Response(params?: {
    body?: PictureEntryDto
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PicturePostPath, 'post');
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
   * To access the full response (for headers, for example), `picturePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  picturePost(params?: {
    body?: PictureEntryDto
  }): Observable<PictureEntry> {

    return this.picturePost$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

  /**
   * Path part for operation pictureGet_1
   */
  static readonly PictureGet_1Path = '/api/Picture/ByUserId/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet_1$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_1$Plain$Response(params: {
    userId: string;
  }): Observable<StrictHttpResponse<Array<PictureEntry>>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGet_1Path, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PictureEntry>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pictureGet_1$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_1$Plain(params: {
    userId: string;
  }): Observable<Array<PictureEntry>> {

    return this.pictureGet_1$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PictureEntry>>) => r.body as Array<PictureEntry>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_1$Response(params: {
    userId: string;
  }): Observable<StrictHttpResponse<Array<PictureEntry>>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGet_1Path, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PictureEntry>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pictureGet_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_1(params: {
    userId: string;
  }): Observable<Array<PictureEntry>> {

    return this.pictureGet_1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PictureEntry>>) => r.body as Array<PictureEntry>)
    );
  }

  /**
   * Path part for operation pictureGet_2
   */
  static readonly PictureGet_2Path = '/api/Picture/ByTag/{tag}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet_2$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_2$Plain$Response(params: {
    tag: string;
  }): Observable<StrictHttpResponse<Array<PictureEntry>>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGet_2Path, 'get');
    if (params) {
      rb.path('tag', params.tag, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PictureEntry>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pictureGet_2$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_2$Plain(params: {
    tag: string;
  }): Observable<Array<PictureEntry>> {

    return this.pictureGet_2$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PictureEntry>>) => r.body as Array<PictureEntry>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet_2()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_2$Response(params: {
    tag: string;
  }): Observable<StrictHttpResponse<Array<PictureEntry>>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGet_2Path, 'get');
    if (params) {
      rb.path('tag', params.tag, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PictureEntry>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pictureGet_2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_2(params: {
    tag: string;
  }): Observable<Array<PictureEntry>> {

    return this.pictureGet_2$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PictureEntry>>) => r.body as Array<PictureEntry>)
    );
  }

  /**
   * Path part for operation pictureGet_3
   */
  static readonly PictureGet_3Path = '/api/Picture/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet_3$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_3$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGet_3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `pictureGet_3$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_3$Plain(params: {
    id: number;
  }): Observable<PictureEntry> {

    return this.pictureGet_3$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureGet_3()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureGet_3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `pictureGet_3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureGet_3(params: {
    id: number;
  }): Observable<PictureEntry> {

    return this.pictureGet_3$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

  /**
   * Path part for operation picturePut
   */
  static readonly PicturePutPath = '/api/Picture/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `picturePut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  picturePut$Response(params: {
    id: number;
    body?: PictureEntryDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PicturePutPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `picturePut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  picturePut(params: {
    id: number;
    body?: PictureEntryDto
  }): Observable<void> {

    return this.picturePut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation pictureDelete
   */
  static readonly PictureDeletePath = '/api/Picture/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureDelete$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `pictureDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureDelete$Plain(params: {
    id: number;
  }): Observable<PictureEntry> {

    return this.pictureDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pictureDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureDelete$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PictureEntry>> {

    const rb = new RequestBuilder(this.rootUrl, PictureService.PictureDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `pictureDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pictureDelete(params: {
    id: number;
  }): Observable<PictureEntry> {

    return this.pictureDelete$Response(params).pipe(
      map((r: StrictHttpResponse<PictureEntry>) => r.body as PictureEntry)
    );
  }

}
