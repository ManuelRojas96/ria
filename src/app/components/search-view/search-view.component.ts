import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { WeatherRequesterService } from '../../services/weather-requester.service';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { DailyWeatherComponent } from '../daily-weather/daily-weather.component';
import { DailyData } from '../../models/daily-data';

@Component({
  selector: 'app-search-view',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    DailyWeatherComponent,
  ],
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.scss',
})
export class SearchViewComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  private searchInput = new Subject<string>();

  cityName: string = '';
  showErrorMessage = false;
  showResults = false;
  searchResultData: DailyData[] = [];

  constructor(
    private router: Router,
    private _weatherRequesterService: WeatherRequesterService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchInput
      .pipe(
        takeUntil(this.destroy),
        switchMap((text) => {
          if (text === '') {
            return [];
          }
          return this._weatherRequesterService.getDailyWeatherDataByCityName(
            text
          );
        })
      )
      .subscribe({
        next: (response) => {
          if (!!response) {
            this.showErrorMessage = false;
            this.searchResultData = response;
          }
        },
        error: (e) => {
          this.showErrorMessage = true;
          this.searchResultData = [];
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  onClose(): void {
    this.router.navigate(['/']);
  }

  onEnter(): void {
    this.showResults = false;
    this.showResults = true;
    this.searchInput.next(this.cityName);
    //this._cdr.detectChanges();
  }
}
