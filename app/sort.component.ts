import { Component, Input, Output, Injectable, OnInit, AfterViewInit, EventEmitter } from '@angular/core';

import {SortOn, SortType} from './sorting';
@Component(
    {
        selector: "sort-c",
        template: '<label title="Click to sort" (click)="sortClick($event)">{{icon}}</label>',
        providers: []

    }
)
export class SortComponent {
    icon: string = '♦';
    @Input() sortOn: string;
    @Input() isNumber: string = "false";
    @Output() onSorting: EventEmitter<SortOn> = new EventEmitter();
    private clickCounter: number = 0;
    constructor() {
    }
    sortClick = (e): void => {
        e.preventDefault;

        var sType: SortType;
        ++this.clickCounter;
        switch (this.clickCounter % 4) {
            case 0:
                //this.icon = '♦';
                this.icon = '♦';
                sType = SortType.NoSort;
                break;
            case 1:
                this.icon = '▼';
                sType = SortType.Asc;
                break;

            case 2:
                this.icon = '♦';
                sType = SortType.NoSort;
                break;
            case 3:
                this.icon = '▲';
                sType = SortType.Desc;
                break;


        }
        var isNumber:boolean = this.isNumber.toLowerCase() =="false"?false:true;
        this.onSorting.emit(new SortOn(this.sortOn, isNumber, sType));
    }
}