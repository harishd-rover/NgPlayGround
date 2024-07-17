import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class LoggerService {
  private static count = 0;
  private name = "Harish"
  constructor(createdBy = 'AngularDI') {
    console.log(`Logger instance is created by """${createdBy}"""" instance count: ${++LoggerService.count} --- Log from Logger Service`);
  }
}
