import { Injectable } from '@angular/core';

export enum SortType {
    NoSort,
    Asc,
    Desc
}
export class SortOn {


    constructor(public propertyName: string, public isNumber: boolean, public sortType: SortType) {
    }
}
export class Sorting {
    constructor() {
    }

    public static sort<T>(data: T[], sortOnProperties: SortOn[]): T[] {
        if (data == null || data.length <= 1)
            return data;

        data.sort((x, y) => {
            var c: number = 0;
            for (var i = 0; i < sortOnProperties.length; ++i) {
                var st = sortOnProperties[i];
                if (st.sortType == SortType.NoSort)
                    continue;
                c = Sorting.sortValue(x, y, st);
                if (c != 0)
                    break
                
            }
            return c;
        });
        return data;

    }
    public static stringCompare(x: string, y: string, ignoreCase: boolean): number {
        x = x.toString();
        y = y.toString();
        
        if (x == null && y == null)
            return 0;
        if (x.length > y.length)
            return 1;
        else if (x.length < y.length)
            return -1;
        if (ignoreCase) {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }

        for (var i = 0; i < x.length; ++i) {
            var xC = x.charAt(i);
            var yC = y.charAt(i);
            if (xC == yC)
                continue;
            else {
                if (xC > yC)
                    return 1;
                else if (xC < yC)
                    return -1
            }
        }
        return 0;
    }
    private static sortValue<T>(x: T, y: T, sortOnProperty: SortOn): number {
        var ret: number = 0;
        for (var pName in x) {
            if (pName == sortOnProperty.propertyName) {

                if (sortOnProperty.isNumber == true) {
                    var xN = +x[pName];
                    var yN = +y[pName];
                    if (sortOnProperty.sortType == SortType.Desc) {
                        var yN = +x[pName];
                        var xN = +y[pName];
                    }

                    if (xN > yN)
                        ret = 1;
                    else if (xN < yN)
                        ret = -1
                }
                else {
                    if (sortOnProperty.sortType == SortType.Asc)
                        ret = Sorting.stringCompare(x[pName], y[pName], true);
                    if (sortOnProperty.sortType == SortType.Desc)
                        ret = Sorting.stringCompare(y[pName], x[pName], true);
                }
            }

        }
        return ret;
    }

}

@Injectable()
export class SortUtil {
    public sortOns: SortOn[] = [];
    constructor() {
    }
    public reset = (): void => {
        this.sortOns = [];
    };
    public SetSortOn = (s: SortOn): void => {
        var i: number = this.sortOns.findIndex((x: SortOn) => { return x.propertyName == s.propertyName });
        if (i == -1) {
            if (s.sortType != SortType.NoSort)
                this.sortOns.push(s);
        }
        else {
            if (s.sortType != SortType.NoSort)
                this.sortOns[i].sortType = s.sortType;
            else
                this.removeSortOn(i);
        }

    }
    public sort = <T>(data: T[]): T[] => {
        return Sorting.sort<T>(data, this.sortOns);
    }
    private removeSortOn = (index: number): void => {
        var temp: SortOn[] = this.sortOns;
        this.sortOns = [];
        for (var i = 0; i < temp.length; ++i) {
            if (i == index)
                continue;
            this.sortOns.push(temp[i]);
        }

    }

}