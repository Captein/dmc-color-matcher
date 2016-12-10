import { Component, Input } from '@angular/core';



@Component({
  selector: 'color-search-bar',
  template: `
    <div>
      <input [(ngModel)]="searchColor"  placeholder="color"  width=200px
             [ngStyle]="{'border-color': (!searchColor || isValidColor(searchColor)) ? '#dddddd' : '#ff8888'}"/>
      <input [(ngModel)]="searchDepth"  placeholder="number"  type="number"  width=50px
             [ngStyle]="{'border-color':'#dddddd'}"/>
      <button (click)="checkAndUpdate()">Search</button>
      <div *ngIf="invalidSearchTerm"  style="color:red">
         Please enter a valid hexadecimal color.
      </div>
    </div>
  `,
  styles:[`
     input {
       height: 30px;
     }
  `]
})
export class ColorSearchBarComponent {
  
  searchColor: string;
  searchDepth: number;
  invalidSearchTerm = false;
  @Input() updateTableFunction: Function;


  isValidColor(str: string): boolean {
    return (str.search('^#?(?:[0-9a-fA-F]{3}){1,2}$') != -1);
  }


  checkAndUpdate(): void {
    if (this.searchColor && this.isValidColor(this.searchColor)) {
      this.invalidSearchTerm = false;
      if (this.searchColor.charAt(0) != '#')
        this.searchColor = '#' + this.searchColor;
      if (this.searchDepth <= 1)
        this.searchDepth = 1;
      this.updateTableFunction(this.searchColor, Math.round(this.searchDepth));
    }
    else
      this.invalidSearchTerm = true;
  }

} // ColorSearchBarComponent