import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PortalComponent } from './portal/portal.component';
import { DxButtonModule, DxFormModule, DxPopoverModule, DxPopupModule, DxTabsModule, DxTextBoxModule, DxTileViewModule } from 'devextreme-angular';
import { EditingComponent } from './editing/editing.component';
import { RequestComponent } from './request/request.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { LoginComponent } from './login/login.component';
import { ApiModule } from './api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { PortalState } from './portal/state/portal.state';

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
    NgxsModule.forRoot([PortalState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    DxTileViewModule,
    DxTabsModule,
    DxButtonModule,
    DxTextBoxModule,
    DxFormModule,
    HttpClientModule,
    DxPopoverModule,
    DxPopupModule,
    ApiModule.forRoot({
      rootUrl: 'https://localhost:44384'
    }),
    DxPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
