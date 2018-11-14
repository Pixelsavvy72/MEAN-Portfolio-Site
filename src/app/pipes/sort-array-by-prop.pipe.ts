import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArrayByProp'
})
export class SortArrayByPropPipe implements PipeTransform {

  transform(arr: any[], property: string): any[] {
    // basic sort by property method
    return arr.sort((a, b) => a[property] - b[property]);
  }

}
