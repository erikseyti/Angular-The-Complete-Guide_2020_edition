import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    let reverseArray = Array.from(value);
    let revertedValue =  reverseArray.reverse().join("")
    return revertedValue;
  }

}
