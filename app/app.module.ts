import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { PagerComponent, Paging } from './pager.component';
import { SortComponent } from './sort.component';
import { FilterComponent } from './filter.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule
       
        
    ],
    declarations: [AppComponent,PagerComponent,SortComponent,FilterComponent],

    bootstrap: [AppComponent]
})

export class AppModule { }