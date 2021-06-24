import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, toArray,mergeMap, map } from 'rxjs/operators';
import { Guitars } from '../models/guitars';

@Injectable({
  providedIn: 'root'
})
export class GuitarsService {

  api_url = 'http://localhost:3000/guitars';
  constructor(private http: HttpClient) { }

  getGuitars() {
    return this.http.get<Guitars>(this.api_url).pipe(map(arr => arr.sort((a: Guitars, b: Guitars) => a.name === b.name ? 0 : a.name ? 1 : -1))).pipe(tap(console.log));
  }

}
