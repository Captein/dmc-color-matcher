import { Component, Input, OnInit } from '@angular/core';

import { DmcColor } from './dmc-color';
import { ColorService } from './color.service';



@Component({
  selector: 'color-table',
  template:  `
  <table class="colors">
    <tr *ngFor="let color of colors; let first=first">
      <td *ngIf="first"
          rowspan=5, width=100px, height=75px, [ngStyle]="{'background-color': searchColor}"></td>
      <td width=75px, height=75px, [ngStyle]=setCellColor(color)></td>
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
    width: 100%;
  }
  `],
  providers: [ ColorService ]
})
export class ColorTableComponent implements OnInit {
  
  colors: DmcColor[];
  @Input() searchColor: string;


  constructor(private colorService: ColorService) { }


  ngOnInit(): void {
    this.getColors();
  }


  getColors(): void {
    
    this.colorService.matchColors(this.searchColor)
                     .then(colors => this.colors = colors);
    console.log("Type of colors array: ");
  }


  setCellColor(color: DmcColor) {
    let bgcolor = { 'background-color': color.hex };
    return bgcolor;
  }

} // ColorTableComponent
