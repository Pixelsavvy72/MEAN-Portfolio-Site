import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ImageDataService } from '../services/image-data.service';;
import { ImageFE } from '../models/imageModel';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
// Need destroy this?
export class ImageAddComponent implements OnInit {
  // @Output() submitImage = new EventEmitter;
  id: number;
  editMode = false;
  addImageForm: FormGroup;
  // submitImageSubscription: Subscription;
  // deleteImageSubscription: Subscription;
  error: boolean;
  submitting: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private imageDataService: ImageDataService,
              ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // Set editMode to true if no id supplied.
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    console.log(this.imageDataService.imageToEdit);
  }


  initForm() {
    // In add mode, set black values.
    let imageOrder;
    let imageName = '';
    let imageDesc = '';
    let imageCat = '';
    let imageUrl = '';
    let imageThumbUrl = '';

    if (this.editMode) {
      // In edit mode, get the selected image and update the values above.
      const selectedImage = this.imageDataService.imageToEdit;
      imageName = selectedImage.imageName;
      imageOrder = selectedImage.imageOrder;
      imageDesc = selectedImage.imageDesc;
      imageCat = selectedImage.imageCat;
      imageUrl = selectedImage.imageUrl;
      imageThumbUrl = selectedImage.thumbnailUrl;
    }
    // Initialize Form
    this.addImageForm = new FormGroup({
      'imageOrder' : new FormControl(imageOrder),
      'imageName' : new FormControl(imageName),
      'imageDesc' : new FormControl(imageDesc),
      'imageCat' : new FormControl(imageCat),
      'imageUrl' : new FormControl(imageUrl),
      'thumbnailUrl' : new FormControl(imageThumbUrl),
    });
  }

  onSubmit() {
    if (this.editMode) {
      let editedImage = this.addImageForm.value;
      let dbId = this.imageDataService.getImageByIndex(this.id).id;
      editedImage.id = dbId;
      console.log(`Image id from image-addComponent is ${editedImage.id}.`)
      this.imageDataService.editImage(this.id, editedImage);
      //this.imageDataService.editImage(dbId, this.addImageForm.value);
    } else {
      const image: ImageFE = new ImageFE(
        //+this.addImageForm.get('imageOrder').value,
        this.addImageForm.get('imageOrder').value,
        this.addImageForm.get('imageName').value,
        this.addImageForm.get('imageDesc').value,
        this.addImageForm.get('imageCat').value,
        this.addImageForm.get('imageUrl').value,
        this.addImageForm.get('thumbnailUrl').value
      );
      this.imageDataService.addImage(
      +this.addImageForm.get('imageOrder').value,
      this.addImageForm.get('imageName').value,
      this.addImageForm.get('imageDesc').value,
      this.addImageForm.get('imageCat').value,
      this.addImageForm.get('imageUrl').value,
      this.addImageForm.get('thumbnailUrl').value);

      // this.submitImageSubscription = this.apiService
      //  .postImage$(image)
      //  .subscribe(
      //    // data => this._handleSubmitSuccess(data),
      //    data => console.log(data),
      //    err => this._handleSubmitError(err)
      //  );
    }
    this.onSubmitOrCancel();

  }

  onDelete() {
    let dbId = this.imageDataService.getImageByIndex(this.id).id;
    this.imageDataService.deleteImage(dbId);
    this.onSubmitOrCancel();
  }

  onSubmitOrCancel() {
    this.router.navigate(['/']);
  }


}
