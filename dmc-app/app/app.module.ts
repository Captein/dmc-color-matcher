import { NgModule }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { ColorSearchBarComponent } from './color-search-bar.component';
import { ColorTableComponent } from './color-table.component';
import { ColorService } from './color.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    ColorSearchBarComponent,
    ColorTableComponent
  ],
  providers: [ ColorService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
