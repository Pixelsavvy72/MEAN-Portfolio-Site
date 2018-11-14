import { Component, OnInit } from '@angular/core';
import { ImageDataService } from '../services/image-data.service';
import { ImageFE } from '../models/imageModel';
import { CategoryService } from '../services/category.service';
import { Categories } from '../enums/categories';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: ImageFE[] = [];
  // sortedImages: ImageFE[] = [];
  selectedImages: ImageFE[] = [];
  selectedCategory = '';
  private imageSubscription: Subscription;
  private authStatusSubscription: Subscription;
  isLoggedIn = false;

  constructor(private imageDataService: ImageDataService,
              private categoryService: CategoryService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
    // Start with all images
    //this.images = this.imageDataService.getAllImages();
    // this.categoryService.categorySelected.subscribe(
    //   (selectedCategory: string) => {
    //     this.selectedCategory = selectedCategory;
    //     // Update images array by category when selected.
    //     this.images = this.imageDataService.getCategoryImages(this.selectedCategory);
    //   }
    // );
    this.isLoggedIn = this.authService.getIsAuthenticated();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      })

    this.imageDataService.getAllImages();
    this.imageSubscription = this.imageDataService.getImagesUpdatedListener()
    .subscribe((images: ImageFE[]) => {
      // Do not sort the images array. If so, we can't get original index to retrieve from db.
      this.images = images;
      this.selectedImages = [...images].sort(function(a,b) {return (a.imageOrder > b.imageOrder) ? 1 : ((b.imageOrder > a.imageOrder) ? -1 : 0);});
      // this.sortedImages = [...images].sort(function(a,b) {return (a.imageOrder > b.imageOrder) ? 1 : ((b.imageOrder > a.imageOrder) ? -1 : 0);});
      // console.log("Image list comp oninit");
      // console.log(this.images);
    });

    this.categoryService.categorySelected.subscribe(
      (selectedCategory: string) => {
        this.selectedCategory = selectedCategory;
        // Update images array by category when selected.
        this.selectedImages = this.getCategoryImages(this.selectedCategory).sort(function(a,b) {return (a.imageOrder > b.imageOrder) ? 1 : ((b.imageOrder > a.imageOrder) ? -1 : 0);});;
      }
    );
  }

  getCategoryImages(imageCategory) {
    if (imageCategory === '') {
      return this.images;
    } else {
      return this.images.filter(x => x.imageCat === imageCategory);
    }
  }


  onEditButton(index: number) {
    // If no cat is selected, use all images in images[], else use selectedImages[]
    // to find index.
    if (this.selectedCategory === '') {
      // Get the orig index needed to retrieve image from db.
      const origIndex = this.getImageByImageOrder(this.selectedImages[index].imageOrder);
      console.log("Index is: ");
      console.log(index);
      console.log("Original index is: ");
      console.log(origIndex);
      console.log("Image list comp images arrray:");
      console.log(this.images);
      console.log("IMAGE LIST COMPONENT SELECTED IMAGES ARRAY:")
      console.log(this.selectedImages);
      this.imageDataService.imageToEdit = this.selectedImages[index];
      console.log("DS IMAGE TO EDIT: ")
      console.log(this.imageDataService.imageToEdit);
      this.router.navigate([origIndex, 'edit']);
    } else {
      const origIndex = this.getImageByImageOrder(this.selectedImages[index].imageOrder);
      this.imageDataService.imageToEdit = this.selectedImages[index];
      this.imageDataService.imagesUpdated.next([...this.images]);
      // Everying above is turning up correct. START TROUBLESHOOTING IMAGE-ADD COMPONENT.
      this.router.navigate([origIndex, 'edit']);
    }

  }

  getImageByImageOrder(orderNumber) {
    return this.images.findIndex(x => x.imageOrder === orderNumber);
  }


  // onEditButton(id: number) {
  //   // Pull image from data storage service by orig index.
  //   let origIndex = this.imageDataService.getImageByImageOrder(this.images[id].imageOrder);
  //   this.router.navigate([origIndex, 'edit']);

  // }

}
