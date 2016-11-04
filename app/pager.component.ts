import { Component, Input, Output, Injectable, OnInit, AfterViewInit, EventEmitter } from '@angular/core';

export class Paging {
    fromIndex: number;
    toIndex: number;
}
export class PageLink {
    public index: number;
    public linkText: string = "";
    public selected: boolean;
    constructor() {

    }
}

@Component(
    {
        selector: "Pager-Com",
        templateUrl: 'app/pager.component.html',
        styleUrls: ['app/pager.component.css'],

        providers: []
    }
)
export class PagerComponent implements OnInit {

    public preGroup: PageLink;
    public nextGroup: PageLink;
    public pageIndex: number = 0;
    public pageLinks: PageLink[] = [];
    public pageCount: number;
    private currentPageGroupIndex: number = 0;
    private pageInGroup: number = 10;
    private pager: Paging;
    private _recordCount: number;  
    public selectedPageSize: number = 15;
    @Input()
    set recordCount(count: number)
    {
        this._recordCount = count;
        this.pageIndex = 0;
        this.computeParameters();
        this.paging.emit(this.pager);
    }
    get recordCount() {
        return this._recordCount;
    }

    @Input()
    set pageSize(size: number) {
        this.selectedPageSize = size;
        this.computeParameters();
        this.paging.emit(this.pager);
    }
    get pageSize() {
        return this.selectedPageSize;
    }


    @Output() paging: EventEmitter<Paging> = new EventEmitter();
    constructor() {

        this.preGroup = new PageLink();
        this.nextGroup = new PageLink();
        this.pager = new Paging();


    }
    public ngOnInit() {
        this.computeParameters();
    }
    public pageSizeChange(e): void {
        e.preventdefault;
        this.pageIndex = 0;
        this.pageSize = e.target.value;
        this.computeParameters();
        this.computePager();
        this.paging.emit(this.pager);
    }
    public pageIndexChange(e, index: number): void {
        e.preventdefault;
        if (index != this.pageIndex) {
            this.pageIndex = index;
            this.computeParameters();
            this.computePager();
            this.paging.emit(this.pager);
        }
    }
   
    private computeParameters() {
        this.pageCount = (this.recordCount / this.pageSize) | 0;
        if (this.recordCount % this.pageSize > 0)
            ++this.pageCount;
        this.currentPageGroupIndex = (this.pageIndex / this.pageInGroup) | 0;

        this.preGroup.index = this.currentPageGroupIndex * this.pageInGroup - 1;
        this.preGroup.linkText = this.preGroup.index > 0 ? "◄" : "";

        this.nextGroup.index = this.preGroup.index + this.pageInGroup + 1;
        this.nextGroup.linkText = this.nextGroup.index >= this.pageCount ? "" : "►";

        var loopPageCount: number = this.nextGroup.index < this.pageCount ? this.pageInGroup : this.pageCount - this.preGroup.index - 1;


        this.pageLinks = []
        if (loopPageCount > 1) {
            for (var i = 0; i < loopPageCount; ++i) {
                var pl = new PageLink();
                this.pageLinks.push(pl);
                pl.index = this.currentPageGroupIndex * this.pageInGroup + i;
                pl.linkText = (pl.index + 1).toString();
                pl.selected = pl.index == this.pageIndex;
            }
        }
        this.computePager();
    }
    public getPageLinkCssClass(index: number): string {
        return index == this.pageIndex ? "pageLinkSelected" : "pageLink";
    }
    private computePager() {
        this.pager.fromIndex = this.pageIndex * this.pageSize;
        //Time 1 to force number intead of string
        this.pager.toIndex = (this.pager.fromIndex | 0) + (this.pageSize | 0) - 1;
        if (this.pager.toIndex > this.recordCount - 1)
            this.pager.toIndex = this.recordCount - 1

    }

}

