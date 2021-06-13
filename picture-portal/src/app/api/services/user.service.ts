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

import { LoggedInDto } from '../models/logged-in-dto';
import { LoginDto } from '../models/login-dto';
import { PortalUser } from '../models/portal-user';
import { SignupDto } from '../models/signup-dto';
import { UpdatePasswordDto } from '../models/update-password-dto';
import { UpdateUserDto } from '../models/update-user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation userGet
   */
  static readonly UserGetPath = '/api/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<PortalUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PortalUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Plain(params?: {
  }): Observable<PortalUser> {

    return this.userGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PortalUser>) => r.body as PortalUser)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Response(params?: {
  }): Observable<StrictHttpResponse<PortalUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PortalUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet(params?: {
  }): Observable<PortalUser> {

    return this.userGet$Response(params).pipe(
      map((r: StrictHttpResponse<PortalUser>) => r.body as PortalUser)
    );
  }

  /**
   * Path part for operation userPost
   */
  static readonly UserPostPath = '/api/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost$Plain$Response(params?: {
    body?: UpdateUserDto
  }): Observable<StrictHttpResponse<PortalUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PortalUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost$Plain(params?: {
    body?: UpdateUserDto
  }): Observable<PortalUser> {

    return this.userPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PortalUser>) => r.body as PortalUser)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost$Response(params?: {
    body?: UpdateUserDto
  }): Observable<StrictHttpResponse<PortalUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PortalUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost(params?: {
    body?: UpdateUserDto
  }): Observable<PortalUser> {

    return this.userPost$Response(params).pipe(
      map((r: StrictHttpResponse<PortalUser>) => r.body as PortalUser)
    );
  }

  /**
   * Path part for operation userDelete
   */
  static readonly UserDeletePath = '/api/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDelete$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserDeletePath, 'delete');
    if (params) {
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
   * To access the full response (for headers, for example), `userDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDelete(params?: {
  }): Observable<void> {

    return this.userDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userPost_1
   */
  static readonly UserPost_1Path = '/api/User/Password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost_1$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_1$Plain$Response(params?: {
    body?: UpdatePasswordDto
  }): Observable<StrictHttpResponse<PortalUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPost_1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PortalUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost_1$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_1$Plain(params?: {
    body?: UpdatePasswordDto
  }): Observable<PortalUser> {

    return this.userPost_1$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PortalUser>) => r.body as PortalUser)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost_1()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_1$Response(params?: {
    body?: UpdatePasswordDto
  }): Observable<StrictHttpResponse<PortalUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPost_1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PortalUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost_1$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_1(params?: {
    body?: UpdatePasswordDto
  }): Observable<PortalUser> {

    return this.userPost_1$Response(params).pipe(
      map((r: StrictHttpResponse<PortalUser>) => r.body as PortalUser)
    );
  }

  /**
   * Path part for operation userPost_2
   */
  static readonly UserPost_2Path = '/api/User/Login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost_2$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_2$Plain$Response(params?: {
    body?: LoginDto
  }): Observable<StrictHttpResponse<LoggedInDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPost_2Path, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoggedInDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost_2$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_2$Plain(params?: {
    body?: LoginDto
  }): Observable<LoggedInDto> {

    return this.userPost_2$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LoggedInDto>) => r.body as LoggedInDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost_2()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_2$Response(params?: {
    body?: LoginDto
  }): Observable<StrictHttpResponse<LoggedInDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPost_2Path, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoggedInDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost_2$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_2(params?: {
    body?: LoginDto
  }): Observable<LoggedInDto> {

    return this.userPost_2$Response(params).pipe(
      map((r: StrictHttpResponse<LoggedInDto>) => r.body as LoggedInDto)
    );
  }

  /**
   * Path part for operation userPost_3
   */
  static readonly UserPost_3Path = '/api/User/Signup';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost_3$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_3$Plain$Response(params?: {
    body?: SignupDto
  }): Observable<StrictHttpResponse<LoggedInDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPost_3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoggedInDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost_3$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_3$Plain(params?: {
    body?: SignupDto
  }): Observable<LoggedInDto> {

    return this.userPost_3$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LoggedInDto>) => r.body as LoggedInDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPost_3()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_3$Response(params?: {
    body?: SignupDto
  }): Observable<StrictHttpResponse<LoggedInDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserPost_3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoggedInDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userPost_3$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  userPost_3(params?: {
    body?: SignupDto
  }): Observable<LoggedInDto> {

    return this.userPost_3$Response(params).pipe(
      map((r: StrictHttpResponse<LoggedInDto>) => r.body as LoggedInDto)
    );
  }

}
