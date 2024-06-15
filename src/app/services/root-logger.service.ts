import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootLoggerService {

  constructor() { 
    console.log('Root Logger created')
  }
}
