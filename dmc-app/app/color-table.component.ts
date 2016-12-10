import { Component } from '@angular/core';

import { DmcColor } from './dmc-color';
import { ColorService } from './color.service';



@Component({
  selector: 'color-table',
  template:  `
  <color-search-bar [updateTableFunction]="getUpdateFunction()"></color-search-bar>
  <table *ngIf="searchColor"  class="colors">
    <tr *ngFor="let color of colors; let first=first">
      <td *ngIf="first"
          [attr.rowspan]="searchDepth"  width=100px  height=75px  [ngStyle]="{'background-color': searchColor}"></td>
      <td width=75px  height=75px  [ngStyle]=setCellColor(color)></td>
      <td>
        <div>
          <b>{{color.name}}</b></div>
        <div>
          <label>DMC </label>#{{color.id}}</div>
        <div>
          <label>HEX </label>{{color.hex}}</div>
      </td>
    </tr>
  </table>
  `,
  styles: [`
  table { 
    font-family: Arial, Helvetica, sans-serif;
  }
  `],
  providers: [ ColorService ]
})
export class ColorTableComponent{
  
  colors: DmcColor[];
  searchColor: string;
  searchDepth: number;


  constructor(private colorService: ColorService) { }


  getUpdateFunction(): Function {
    return ((term, depth) => { this.searchColor = term;
                               this.searchDepth = depth;
                               this.getColors();
                             });
  }


  getColors(): void {
    this.colorService.matchColors(this.searchColor, this.searchDepth)
                     .then(colors => this.colors = colors);
  }


  setCellColor(color: DmcColor) {
    let bgcolor = { 'background-color': color.hex };
    return bgcolor;
  }

} // ColorTableComponent


