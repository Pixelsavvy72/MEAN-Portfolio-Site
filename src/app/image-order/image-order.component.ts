import { Component, OnInit } from '@angular/core';
//import { ImagesService } from '../';
import { ImageFE } from '../models/imageModel';
import { ImageDataService } from '../services/image-data.service';
import { Subscription } from 'rxjs';
import { ImageSharingService } from '../services/image-sharing.service';

@Component({
  selector: 'app-image-order',
  templateUrl: './image-order.component.html',
  styleUrls: ['./image-order.component.css']
})
export class ImageOrderComponent implements OnInit {

  images: ImageFE[] = [...this.imageDataService.images.sort()];

  private imageSubscription: Subscription;

  constructor( private imageDataService: ImageDataService,
               private imageSharingService: ImageSharingService ) { }

  ngOnInit() {

    // this.imageDataService.imagesUpdated.subscribe(
    //   (images: ImageFE[]) => {
    //     this.images = images;
    //   }
    // );
    // this.imageSubscription = this.imageDataService.getImagesUpdatedListener()
    // .subscribe((images: ImageFE[]) => {
    //   this.images = images;
    //   console.log(images);
    // });
    // console.log(this.images);
  }


}
