import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { V1Component } from './app/v1/v1/v1.component';
import { V2Component } from './app/v2/v2/v2.component'; // importando V2
import { V3Component } from './app/v3/v3/v3.component'; // importando V3
import { V4Component } from './app/v4/v4/v4.component';
import { HomeComponent } from './app/home/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'v1', component: V1Component },
  { path: 'v2', component: V2Component },
  { path: 'v3', component: V3Component },
  { path: 'v4', component: V4Component },
  
];
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers, // si `appConfig` tiene `providers`
    provideRouter(routes)
  ]
});
