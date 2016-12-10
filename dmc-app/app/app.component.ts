import { Component } from '@angular/core';



@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <color-table></color-table>
  `
  //templateUrl: '../templates/app.component.html',
  //styleUrls: [ '../styles/app.component.css' ]
})
export class AppComponent { 

  title = 'DMC Color Matcher';

} // AppComponent