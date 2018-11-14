import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Categories } from '../enums/categories';

import { ImageFE } from '../models/imageModel';
import { ImageSharingService } from "./image-sharing.service";
import { CategoryService } from "./category.service";

@Injectable({ providedIn: "root" })
export class ImageDataService {
  public images: ImageFE[] = [];
  public imagesUpdated = new Subject<ImageFE[]>();
  imageToEdit: ImageFE;

  constructor(private http: HttpClient,
              private imageSharingService: ImageSharingService,
              private categoryService: CategoryService,) {};

  getAllImages() {
    // return this.images;
    this.http
    .get<{ message: string; images: any }>(
      "http://localhost:3000/api/images"
    )
    .pipe(map((imageData) => {
      return imageData.images.map(image => {
        return {
          imageOrder: image.imageOrder,
          imageName: image.imageName,
          imageDesc: image.imageDesc,
          imageCat: image.imageCat,
          imageUrl: image.imageUrl,
          thumbnailUrl: image.thumbnailUrl,
          id: image._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.images = transformedPosts;
      this.imagesUpdated.next([...this.images]);
    });
  }

  getImagesUpdatedListener() {
    return this.imagesUpdated.asObservable();
  }

  getCategoryImages(imageCategory) {
    return this.images.filter(x => x.imageCat === imageCategory);
  }

  getImageByIndex(id) {
    return this.images[id];
  }

  getImageByImageOrder(orderNumber) {
    return this.images.findIndex(x => x.imageOrder === orderNumber);
  }



  addImage(
    imageOrder: number,
    imageName: string,
    imageDesc: string,
    imageCat: string,
    imageUrl: string,
    thumbnailUrl: string,
    // id: string
  ) {
    const image: ImageFE = {
      imageOrder: imageOrder,
      imageName: imageName,
      imageDesc: imageDesc,
      imageCat: imageCat,
      imageUrl: imageUrl,
      thumbnailUrl: thumbnailUrl,
      id: null
    };
    this.http
      .post<{ message: string, imageId: string }>("http://localhost:3000/api/images", image)
      .subscribe(responseData => {
        const id = responseData.imageId;
        image.id = id;
        this.images.push(image);
        this.imagesUpdated.next([...this.images]);
      });
  }

  // editImage(index: number, image: ImageFE) {
  //   this.images[index] = image;
  // }

  editImage(index: number, image: ImageFE ) {
    // this.images[index] = image;
    this.http.put("http://localhost:3000/api/images/" + image.id, image)
      .subscribe((response) => {
        const updatedImages = [...this.images];
        const oldImageIndex = updatedImages.findIndex(i => i.id === image.id);
        updatedImages[oldImageIndex] = image;
        this.images = updatedImages;
        this.imagesUpdated.next([...this.images]);
        // need this?  this.router.navigate(["/"]);
      });
  }

  deleteImage(imageId: string) {
    this.http.delete("http://localhost:3000/api/images/" + imageId)
      .subscribe(() => {
        const updatedImages = this.images.filter(image => image.id !== imageId);
        this.images = updatedImages;
        this.imagesUpdated.next([...this.images]);
      });
  }

}
