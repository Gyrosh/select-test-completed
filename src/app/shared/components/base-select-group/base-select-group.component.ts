import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, forwardRef, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AUTH_GROUP_TYPE, FIELD_GROUP_TYPE } from './select-types';
import { BaseSelectOptionComponent } from './base-select-option/base-select-option.component';
import { groupBy } from '../../helpers/group-json';

@Component({
  selector: 'app-base-select-group',
  templateUrl: './base-select-group.component.html',
  styleUrls: ['./base-select-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSelectGroupComponent),
      multi: true
    }
  ]
})
export class BaseSelectGroupComponent<T> implements OnInit, ControlValueAccessor {
  openList = false;
  value: T;
  selected: T;
  groups: string[];
  groupValues: {[key: string] : T[]}


  @Input() invalid: boolean;
  @Input() listData: T[];

  @Input() config;

  @Output() selectedOption: EventEmitter<T> =  new EventEmitter<T>();

  @ViewChild('optionValueContainer') optionValueContainer: BaseSelectOptionComponent<T>;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    if(this.config.groupByType) {
      if(this.config?.groupByType.type === AUTH_GROUP_TYPE) {
        this.groups = ["Me", "Others"];
        this.groupValues = {
          "Me" : [this.config.groupByType.fieldData as T],
          "Others": this.formatSelectData(this.listData, AUTH_GROUP_TYPE)
        }

      }
      if(this.config?.groupByType.type === FIELD_GROUP_TYPE) {
        this.groups = Array.from(new Set(this.listData.map((item) => item[this.config.groupByType.fieldData])));
        this.groupValues = groupBy(this.listData, this.config.groupByType.fieldData);
      }
      if( ![AUTH_GROUP_TYPE, FIELD_GROUP_TYPE].includes(this.config?.groupByType.type)) {
        console.error("Unrecognized group type")
      }
    }
  }

  formatSelectData(data: T[], authType: string) :T[] {
    if(authType === AUTH_GROUP_TYPE) {
      return data.filter(item => item[this.config.valueDataKey] !== this.config.groupByType.fieldData[this.config.valueDataKey])
    } else {
      return data;
    }
  }

  onChange = (object: T) => {};
  onTouched = () => {}

  writeValue(object: T) {
      this.value = object[this.config.valueDataKey];
      this.onChange(object[this.config.valueDataKey]);
  }
  registerOnChange(fn: (object: T) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectionChanged(selectObject) {
    this.selected = selectObject;
    this.selectedOption.emit(selectObject); 
    this.closeList();
    this.writeValue(selectObject);
  }

  toggleList() {
    this.openList = !this.openList;
  }

  closeList() {
    this.openList = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideHandler(event) {
    if(!this.elRef.nativeElement.contains(event.target)) {
      this.closeList();
    } 
  }

}
