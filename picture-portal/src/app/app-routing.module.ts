import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { EditingComponent } from './editing/editing.component';
import { AdminGuard } from './login/admin.guard';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { PortalComponent } from './portal/portal.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Pictures', component: PortalComponent },
  { path: 'Edit', component: EditingComponent, canActivate: [ LoginGuard ] },
  { path: 'Request', component: RequestComponent, canActivate: [ LoginGuard ] },
  { path: 'Admin-Request', component: AdminRequestComponent, canActivate: [ AdminGuard ] },
  { path: 'Settings', component: ProfileSettingsComponent, canActivate: [ LoginGuard ] },
  { path: '', redirectTo: 'Pictures', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
