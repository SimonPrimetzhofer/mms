import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PortalComponent } from './portal/portal.component';
import { DxButtonModule, DxFormModule, DxPopoverModule, DxPopupModule, DxTabsModule, DxTextBoxModule, DxTileViewModule, DxValidatorModule, DxValidationGroupModule } from 'devextreme-angular';
import { EditingComponent, EditingDialog } from './editing/editing.component';
import { RequestComponent } from './request/request.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './login/jwt.interceptor';
import { AuthenticationService } from './api/services/authentication.service';
import { ApiModule } from './api/api.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortalState } from './portal/state/portal.state';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
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
    EditingDialog,
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
    DxFormModule,
    HttpClientModule,
    DxPopoverModule,
    DxPopupModule,
    ApiModule.forRoot({
      rootUrl: 'https://localhost:44384'
    }),
    DxPopoverModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    DxValidatorModule,
    DxValidationGroupModule
  ],
  entryComponents: [EditingDialog],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
