import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFieldInvalid'
})
export class IsFieldInvalidPipe implements PipeTransform {
  transform(invalid: boolean, submitted: boolean): boolean {
    return invalid && submitted;
  }
}
