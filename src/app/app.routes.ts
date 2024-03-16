import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
  {
    path: 'pets',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
  { path: '**', redirectTo: '' },
];
