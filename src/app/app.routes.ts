import { Routes } from '@angular/router';
import { WeatherViewComponent } from './components/weather-view/weather-view.component';
import { SearchViewComponent } from './components/search-view/search-view.component';

export const routes: Routes = [
  {
    path: '',
    component: WeatherViewComponent,
  },
  { path: 'search', component: SearchViewComponent },
  { path: '**', component: WeatherViewComponent },
];
