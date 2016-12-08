import { Component } from '@angular/core';



@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <color-search-bar [updateSearchTerm]="getSearchColorFunction()"></color-search-bar>
  <color-table *ngIf="searchColor" [searchColor]="searchColor"></color-table>
  `
  //templateUrl: '../templates/app.component.html',
  //styleUrls: [ '../styles/app.component.css' ]
})
export class AppComponent { 

  title = 'DMC Color Matcher';
  searchColor: string;


  getSearchColorFunction(): Function {
    return (searchTerm => this.searchColor = searchTerm);
  }

} // AppComponent
