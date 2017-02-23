declare var require: any;
declare var imagesLoaded: any;

import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    ElementRef,
    EventEmitter,
} from '@angular/core';

const isotope = require('isotope-layout');

import { IsotopeOptions } from './isotope-options';

@Component({
    selector: '[isotope], isotope',
    template: '<ng-content></ng-content>'
})
export class AngularIsotope implements OnInit, OnDestroy {

    constructor(
        private _element: ElementRef
    ) { }

    public _isotope: any;
    // private _imagesLoaded = null;

    // Inputs
    @Input() public options: IsotopeOptions;
    @Input() public useImagesLoaded: Boolean = false;

    // Outputs
    @Output() layoutComplete: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() removeComplete: EventEmitter<any[]> = new EventEmitter<any[]>();

    ngOnInit() {
        ///TODO: How to load imagesloaded only if this.useImagesLoaded===true?
        // if (this.useImagesLoaded) {
        //     this._imagesLoaded = require('imagesloaded');
        // }

        // Create isotope options object
        if (!this.options) this.options = {};

        // Set default itemSelector
        if (!this.options.itemSelector) {
            this.options.itemSelector = '[isotope-brick], isotope-brick';
        }

        // Set element display to block
        if (this._element.nativeElement.tagName === 'MASONRY') {
            this._element.nativeElement.style.display = 'block';
        }

        // Initialize Masonry
        this._isotope = new isotope(this._element.nativeElement, this.options);

        // Bind to events
        this._isotope.on('layoutComplete', (items: any) => {
            this.layoutComplete.emit(items);
        });
        this._isotope.on('removeComplete', (items: any) => {
            this.removeComplete.emit(items);
        });
    }

    ngOnDestroy() {
        if (this._isotope) {
            this._isotope.destroy();
        }
    }

    public layout() {
        setTimeout(() => {
            this._isotope.layout();
        });

    }

    // public add(element: HTMLElement, prepend: boolean = false) {
    public add(element: HTMLElement) {

        let isFirstItem = false;

        // Check if first item
        if(this._isotope.items.length === 0){
            isFirstItem = true;
        }

        if (this.useImagesLoaded) {
            imagesLoaded(element, (instance: any) => {
                this._element.nativeElement.appendChild(element);

                // Tell Masonry that a child element has been added
                this._isotope.appended(element);

                // layout if first item
                if(isFirstItem) this.layout();
            });

            this._element.nativeElement.removeChild(element);
        }
        else {
            // Tell Masonry that a child element has been added
            this._isotope.appended(element);

            // layout if first item
            if (isFirstItem) this.layout();
        }

    }

    public remove(element: HTMLElement) {
        // Tell Masonry that a child element has been removed
        this._isotope.remove(element);

        // Layout items
        this.layout();

    }
}
