import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class LoggerService {
  private static count = 0;
  constructor() {
    console.log("Logger instance is created", ++LoggerService.count, 'from Logger Service');
  }
}
