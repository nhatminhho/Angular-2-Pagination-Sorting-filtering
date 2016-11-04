import { Component } from '@angular/core';
import { AppComponent } from './app.component';
@Component(
    {
        selector: 'popup-demo',
        template: '<div><h3>Popup Demo</h3><p>Drag me away from the center and click on <b>Another popup</b> button to see another of me stack up on top of me.</p><input type="button" value="Another popup" (click)="popup()" /></div>',
        styleUrls: [],
        providers: []
    }
)
export class PopupDemo {

    constructor() {

    }
    popup = () => {
        AppComponent.PopupControler.PopupComponent(PopupDemo);
    }
}
