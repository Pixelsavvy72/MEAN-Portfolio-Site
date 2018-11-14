// import { Pipe, PipeTransform } from '@angular/core';
// import { Categories } from '../enums/categories';
// import { ImageDataService } from '../services/image-data.service';
// import { ImageFE } from '../models/imageModel';
// import { Subscription } from 'rxjs';

// @Pipe({
//   name: 'filterPipe',
// })
// export class FilterPipePipe implements PipeTransform {

//   constructor( private imageDateService: ImageDataService) {}

//   transform(value: any, filterString: string, propName: string): any {
//     let filteredArray = [];
//     for (const image of value) {
//       if (image[propName] === filterString) {
//         filteredArray.push(image);
//       }
//     }
//     if (!filteredArray[0] && !filterString) {
//       filteredArray = this.imageDateService.getAllImages();
//     }
//     return filteredArray;
//   }

// }



