# SimpleEventFormAngular

## Installation and usage

`npm install` and then `npm run start`

## Description

This project provides a custom and customizable select control.

Core of Custom Select is component called `BaseSelectGroupComponent`.

This is a component of generic type `T`, because it is not known what type of data user wants to display. It implements `ControlValueAccessor` interface for passing selected data into form.

It sends value upwards by using `@Output()` decorator and `EventEmitter` class.

Accepted parameters: 

`#employeeSelect` - pointer to a element via `@ViewChild` property decorator to specify type of this component

`listData` - data user wants to display

`formControlName` - name of field in the form

`config` - an object of type `SelectComponentConfig` to describe how component should behave

`invalid` - expression to evaluate wheter field is invalid

To specify a type of this component, declare it in parent component using `@ViewChild()`, for example:

`@ViewChild('employeeSelect') employeeSelect: BaseSelectGroupComponent<Employee>;`

Select config is type of `SelectComponentConfig` that looks like follows:

```ts
export interface SelectComponentConfig<T> {
    fieldPlaceholder: string,
    valueDataKey: string,
    displayDataKeys: string[],
    groupByType?: {type: string, fieldData: T | string},
}
```

`fieldPlaceholder` - initial text to display

`valueDataKey` - value of attribute(key) that should be sent to form

`displayDataKeys` - what values should be displayed in the list

`groupByType` - if and how values should be grouped in select. `type` accepts only `AUTH_GROUP_TYPE` and `FIELD_GROUP_TYLE` as a values. `fieldData` accepts a key of object(string) or an object of type `T`(for `AUTH_GROUP_TYPE` grouping)

Example config:

```ts
...
    employeesSelectConfig: SelectComponentConfig<Employee>;
...
    this.employeesSelectConfig = {
      fieldPlaceholder: "Please choose a coordinator",
      valueDataKey: "id",
      displayDataKeys: ["name", "lastname"],
      groupByType: {
        type: AUTH_GROUP_TYPE,
        fieldData: this.currentUser
      }
    }
```

Example usage in template:

```html
    <app-base-select-group 
        #employeeSelect
        [listData]="employees"
        formControlName="coordinatorId"
        [config]="employeesSelectConfig"
        [invalid]="(form | getFormControl : 'coordinatorId').invalid | isFieldInvalid : submitted"
    >
    </app-base-select-group>
```

Every select option is also a component of type `T` and its definition resides in `BaseSelectOptionComponent` class.

Like in previous component, its type is specified using `@ViewChild()`:

`@ViewChild('optionValueContainer') optionValueContainer: BaseSelectOptionComponent<T>;`

Example usage in template:

```html
    <app-base-select-option 
        #optionValueContainer
        *ngFor="let option of listData" 
        [option]="option"
        [dataKeysDisplay]="config.displayDataKeys" 
        (selectionChanged)="onSelectionChanged($event)"
    >
    </app-base-select-option>
```

Data is displayed using `ng-container` and looping through fields in object:
```ts
    <ng-container *ngFor="let dataValue of dataKeysDisplay">
        {{ option[dataValue] }}
    </ng-container>
```        

## Grouping

This solution for custom select control provides also "non-auth" grouping possibility.

This can be done by passing additional parameter to the select config called `groupByType` with `type: FIELD_GROUP_TYPE` (allowed types are defined in `select-types.ts` file) and `fieldData` which is the key that data should be grouped by.

Example part of config:

```ts
...
    groupByType: {
    type: FIELD_GROUP_TYPE,
    fieldData: "department"
    }
...
```

Group names are extracted from provided data, and group values are received by running `groupBy` function defined in `helpers/group-json.ts` file.

```
    this.groups = Array.from(new Set(this.listData.map((item) => item[this.config.groupByType.fieldData])));
    this.groupValues = groupBy(this.listData, this.config.groupByType.fieldData);
```

## Handling clicking outside of components

This case was solved by injecting into `BaseSelectGroupComponent` a class called `ElementRef` to have access to component DOM element and adding a handler function with `@HostListener` decorator that tracks user clicking on the page:

```ts
  @HostListener('document:click', ['$event'])
  clickOutsideHandler(event) {
    if(!this.elRef.nativeElement.contains(event.target)) {
      this.closeList();
    } 
  }
```


