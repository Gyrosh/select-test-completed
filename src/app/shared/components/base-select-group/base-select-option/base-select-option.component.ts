import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { Employee } from 'src/app/shared/interfaces/employee.interface';
@Component({
  selector: 'app-base-select-option',
  templateUrl: './base-select-option.component.html',
  styleUrls: ['./base-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseSelectOptionComponent<T> implements OnInit {

  @Input() option : T;
  @Input() dataKeysDisplay: string[];
  @Output() selectionChanged: EventEmitter<T> =  new EventEmitter<T>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedOption(option) {
    this.selectionChanged.emit(option)

  }

}
