import { TestBed } from '@angular/core/testing';

import { WeatherRequesterService } from './weather-requester.service';
import { HttpClient } from '@angular/common/http';

describe('WeatherRequesterService', () => {
  let service: WeatherRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
