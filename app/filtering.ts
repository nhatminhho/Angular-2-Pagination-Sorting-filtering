import { Injectable } from '@angular/core';

export class FilterOn {
    constructor(public propertyName: string, public text: string) {
    }
}
export class Filtering {
    constructor() {
    }

    public static filter = <T>(data: T[], filterOnProperties: FilterOn[]): T[] => {
        if (data == null || data.length <= 1 || filterOnProperties == null || filterOnProperties.length == 0)
            return data;
        return data.filter((v: T, i: number, vs: T[]) => {
            var ret: boolean = false;
            for (var index = 0; index < filterOnProperties.length; ++index) {
                ret = Filtering.filterValue<T>(v, filterOnProperties[index]);
                if (!ret)
                    break;
            }

            return ret;
        });
    }
    
    private static filterValue = <T>(x: T, filterOnProperties: FilterOn): boolean =>{
        var searchText: string = x[filterOnProperties.propertyName].toString().toLowerCase();
        var searchFor: string = filterOnProperties.text.toLowerCase();
        var i: number = searchText.indexOf(searchFor);
        return i >= 0;

    }

}

@Injectable()
export class FilterUtil {
    public filterOns: FilterOn[] = [];
    constructor() {
    }
    public reset = (): void => {
        this.filterOns = [];
    };
    public setFilterOn = (s: FilterOn): void => {
        var i: number = this.filterOns.findIndex((x: FilterOn) => { return x.propertyName == s.propertyName });
        if (i == -1) {
            if (s.text != null && s.text.length > 0)
                this.filterOns.push(s);
        }
        else {
            if (s.text != null && s.text.length > 0)
                this.filterOns[i].text = s.text;
            else
                this.removeFilterOn(i);
        }

    }
    public fitler = <T>(data: T[]): T[] => {
        return Filtering.filter<T>(data, this.filterOns);
    }
    private removeFilterOn = (index: number): void => {
        var temp: FilterOn[] = this.filterOns;
        this.filterOns = [];
        for (var i = 0; i < temp.length; ++i) {
            if (i == index)
                continue;
            this.filterOns.push(temp[i]);
        }

    }

}