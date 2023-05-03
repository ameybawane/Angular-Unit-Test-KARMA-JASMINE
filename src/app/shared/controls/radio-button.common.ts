import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'prt-radio-button',
  template: `
    <p-radioButton 
                [value]="value"
                [name]="name"
                [label]="labelText"
                [disabled]="disabled"
                [class]="labelStyleClass"
                [(ngModel)]="ngModel"
                (ngModelChange)="onChange($event)">
    </p-radioButton>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RadioComponent {

  @Input() value: any;
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() labelStyleClass?: string;
  @Input() labelText: any;
  @Input() ngModel: any;
  @Output() ngModelChangeValue = new EventEmitter<any>();

  private _onChange: any = () => { };
  private onTouched: any = () => { };

  writeValue(value: any): void {
    this.ngModel = value;
    this._onChange(value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event: any) {
    this.ngModelChangeValue.emit(event);
    this._onChange(event);
    console.log("from common controller onChange(): " + event);
  }
}
