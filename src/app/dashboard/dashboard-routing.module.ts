import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routes';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: DashboardRoutes, canActivate: [ AuthGuardService ] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
