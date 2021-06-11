import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(listValue: any): any {
    listValue.sort((a, b) => a.name.localeCompare(b.name))
    return listValue;
  }

}
