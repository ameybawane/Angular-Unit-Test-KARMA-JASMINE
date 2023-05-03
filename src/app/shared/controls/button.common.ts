import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'prt-button',
    template: `
     <button pButton [loading]="loading" pRipple [disabled]="isDisabled" [loadingIcon]="loadIcon" [type]="type"
                                [label]="buttonText"  (click)="onClick($event)" [ngClass]="btnClass"
                                class="p-button-outlined p-button-sm common-button w-100"></button>
    `,
    encapsulation: ViewEncapsulation.None,
})

export class ButtonComponent implements OnInit {

    @Input() buttonText: string = 'Default Button';
    @Input() btnClass: string = '';
    @Input() disableBtn!: boolean;
    @Input() type: string = 'button';
    @Input() loadIcon: string = 'pi pi-spin pi-spinner';
    @Output() btnClick = new EventEmitter();
    @Input() isDisabled: boolean = false;
    @Input() loading: boolean = false;

    onClick(event: any) {
        this.btnClick.emit(event);
    }

    constructor() { }

    ngOnInit() { }
}