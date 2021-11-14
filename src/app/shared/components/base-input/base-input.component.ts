import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-base-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputComponent),
      multi: true
    }
  ],
})
export class BaseInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'number' | 'date' = 'text';
  @Input() placeholder?: string;
  @Input() invalid?: boolean;
  value: any;
  disabled?: boolean;

  onChange = (_: any) => {};
  onTouched = (_: any) => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
