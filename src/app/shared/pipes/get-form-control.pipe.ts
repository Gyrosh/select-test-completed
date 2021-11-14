import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'getFormControl'
})
export class GetFormControlPipe implements PipeTransform {
  transform(form: FormGroup, path: string): AbstractControl {
    const keys = path.split('.');
    return this.getNestedControl(keys, form);
  }

  getNestedControl(keys: Array<string>, control: AbstractControl | FormGroup): AbstractControl | FormGroup {
    const key = keys?.[0];
    if (key) {
      return control ? this.getNestedControl(keys.slice(1), control.get(key)) : undefined;
    } else {
      return control;
    }
  }
}
