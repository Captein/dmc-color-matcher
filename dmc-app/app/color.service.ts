import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DmcColor } from './dmc-color';



@Injectable()
export class ColorService {
  
  private colorsUrl = 'http://127.0.0.1:5000';

  constructor(private http: Http) { }


  matchColors(searchColor: string, searchDepth: number): Promise<DmcColor[]> {
    
    if (searchColor.charAt(0) == '#')
      searchColor = searchColor.substring(1);
    
    const url = `${this.colorsUrl}/color?hex=${searchColor}&n=${searchDepth}`;
    console.log(`Getting from ${url}`);
    
    return this.http.get(url)
               .toPromise()
               .then(response => response.json() as DmcColor[])
               .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // Flesh this out?
    return Promise.reject(error.message || error);
  }

} // ColorService