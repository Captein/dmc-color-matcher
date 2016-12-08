import { Component, Input } from '@angular/core';



@Component({
  selector: 'color-search-bar',
  template: `
    <div>
      <input [(ngModel)]="searchColor" placeholder="color" 
             [ngStyle]="{'border-color': (!searchColor || isValidColor(searchColor)) ? '#dddddd' : '#ff8888'}"/>
      <button (click)="checkAndUpdate(searchColor)">Search</button>
      <div *ngIf="invalidSearchTerm"  style="color:red">
         Please enter a valid hexadecimal color.
      </div>
    </div>
  `,
  styles:[`
     input {
       width: 200px;
       height: 30px;
     }
  `]
})
export class ColorSearchBarComponent {
  
  searchColor: string;
  invalidSearchTerm = false;
  @Input() updateSearchTerm: Function;


  isValidColor(str: string): boolean {
    return (str.search('^#?(?:[0-9a-fA-F]{3}){1,2}$') != -1);
  }


  checkAndUpdate(searchTerm: string): void {
    if (searchTerm && this.isValidColor(searchTerm)) {
      this.invalidSearchTerm = false;
      if (searchTerm.charAt(0) != '#')
        searchTerm = '#' + searchTerm;
      this.updateSearchTerm(searchTerm);
    }
    else
      this.invalidSearchTerm = true;
  }

} // ColorSearchBarComponent