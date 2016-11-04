import { Component, Input, Output, Injectable, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import {FilterOn} from './filtering';
@Component(
    {
        selector: "filter-c",
        templateUrl: 'app/filter.component.html',
        styleUrls: ['app/filter.component.css'],
        providers: []

    }
)
export class FilterComponent {
    icon: string = '╦';
    @Input() fiterAgainst: string;
    @Input() width: string = "50px";
    @Input() height: string = "17px";
    @Output() onFiltering: EventEmitter<FilterOn> = new EventEmitter();
    filterOn: boolean = false;
    filterStatusCss: string;
    text: string = "";
    constructor() {
    }
    fitlerClick = (e): void => {
        e.preventDefault;
        this.filterOn = !this.filterOn;
        this.filterStatusCss = this.filterOn ? "filterOn" : "filterOff";
        if (this.filterOn) {
            this.filterStatusCss = "filterOn";
        }
        else {
            this.text = "";
            this.filterStatusCss = "filterOff";
            this.notify();
        }
        
    }
    filterChange = (e, enter): void => {
        
        e.preventDefault;
        this.text = e.target.value;
        this.notify();
    }
    private notify=():void=> {
        this.onFiltering.emit(new FilterOn(this.fiterAgainst, this.text));
    }
}