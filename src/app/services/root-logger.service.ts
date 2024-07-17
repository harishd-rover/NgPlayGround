import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootLoggerService {
  private name = "Harish"
  constructor() {
    console.log('Root Logger created')
  }
}
