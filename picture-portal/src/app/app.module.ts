import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PortalComponent } from './portal/portal.component';
import { DxButtonModule, DxTabsModule, DxTextBoxModule, DxTileViewModule } from 'devextreme-angular';
import { EditingComponent } from './editing/editing.component';
import { RequestComponent } from './request/request.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './api/services/authentication.service';
import { AuthState } from './login/state/auth.state';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    EditingComponent,
    RequestComponent,
    AdminRequestComponent,
    ProfileSettingsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AuthState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    DxTileViewModule,
    DxTabsModule,
    DxButtonModule,
    DxTextBoxModule,
    HttpClientModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
