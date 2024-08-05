import { Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { HomeComponent } from '../components/home/home.component';
import { TempFormsComponent } from '../components/temp-forms/temp-forms.component';
import { ReactiveFormsComponent } from '../components/reactive-forms/reactive-forms.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tempForms',
    component: TempFormsComponent
  },
  {
    path: 'reactForms',
    component: ReactiveFormsComponent
  }
];
