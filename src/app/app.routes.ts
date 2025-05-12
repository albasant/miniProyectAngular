import { Routes } from '@angular/router';
import { V4Component } from './v4/v4/v4.component';
import { V1Component } from './v1/v1/v1.component';
export const routes: Routes = [
  { path: '', redirectTo: 'v1', pathMatch: 'full' },
  { path: 'v1', component: V1Component }
];
