import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PortalComponent } from './portal/portal.component';
import { DxButtonModule, DxPopoverModule, DxTabsModule, DxTextBoxModule, DxTileViewModule, DxValidatorModule, DxValidationGroupModule } from 'devextreme-angular';
import { EditingComponent } from './editing/editing.component';
import { RequestComponent } from './request/request.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './login/jwt.interceptor';
import { AuthenticationService } from './api/services/authentication.service';
import { ApiModule } from './api/api.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortalState } from './portal/state/portal.state';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    EditingComponent,
    RequestComponent,
    AdminRequestComponent,
    ProfileSettingsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([PortalState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    DxTileViewModule,
    DxTabsModule,
    DxButtonModule,
    DxTextBoxModule,
    HttpClientModule,
    DxPopoverModule,
    ApiModule.forRoot({
      rootUrl: 'https://localhost:44384'
    }),
    DxValidatorModule,
    DxValidationGroupModule,

  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
