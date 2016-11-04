import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { PagerComponent, Paging } from './pager';
import { SortComponent } from './sort.component';
import { SortUtil, SortOn, SortType } from './sorting';
import { FilterUtil, FilterOn } from './filtering';
class Record {

    constructor(public ID: number, public Firstname: string, public Lastname: string) {
    }


}

@Component({
  selector: 'web-app',
  templateUrl: 'app/app.component.html',
   providers: [SortUtil,FilterUtil],
})
export class AppComponent {
    displayRecords: Record[];
    filteredRecords: Record[];
    title: string = "Paging, sorting and filtering"
    recordCount: number;

    private allRecords: Record[];
    
    constructor(private _sortUtil: SortUtil, private _filterUtil: FilterUtil ) {
      
        this.allRecords = [];
        var lasts: string[] = ["Friday", "Nguyen", "Ho", "Martinez", "Lee", "Ly", "Tran", "Mac", "Job", "Gate", "Bush", "Cliton"];
        var Firsts: string[] = ["Julie", "Cater", "Leo", "Jose", "kimberly", "Nick", "Steven", "Tony", "Mike", "Linh", "Cater", "Ted"];
        for (var i = 1; i < 1500; ++i) {
            var l: number = (Math.random() * lasts.length) | 0;
            var f: number = (Math.random() * Firsts.length) | 0;
            var r = new Record(i, Firsts[f], lasts[l]);
            this.allRecords.push(r);
        }

        this.filteredRecords = this.allRecords;
        this.recordCount = this.filteredRecords.length;
       // this.displayRecords = this.filteredRecords;
      
    }
    pagingEvent = (page: Paging) => {
        var temp: Record[] = [];
        //this.records = this.records.slice(page.fromIndex, page.toIndex);
        //Using basic instead of slice, so that it is intutive to javascript/typescrip beginer.
        for (var i = page.fromIndex; i <= page.toIndex; ++i)
            temp.push(this.filteredRecords[i]);
        this.displayRecords = temp;

    }
      sorting = (s: SortOn): void => {
        this._sortUtil.SetSortOn(s);
        this._sortUtil.sort(this.displayRecords);

    }
     filtering = (f: FilterOn): void => {
        this._filterUtil.setFilterOn(f);
        this.filteredRecords = this._filterUtil.fitler(this.allRecords);
        this.recordCount = this.filteredRecords.length;
    }
}
