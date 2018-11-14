import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ImageListComponent } from './image-list/image-list.component';
import { AppRoutingModule } from './app-routing.module';
// import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageAddComponent } from './image-add/image-add.component';
import { ModalComponent } from './modal/modal.component';
import { ImageOrderComponent } from './image-order/image-order.component';
import { SortArrayByPropPipe } from './pipes/sort-array-by-prop.pipe';
import { ImageDataService } from './services/image-data.service';
import { CategoryService } from './services/category.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
} from "@angular/material";
import { AuthIntercepter } from './auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    ImageListComponent,
    ImageAddComponent,
    ModalComponent,
    ImageOrderComponent,
    SortArrayByPropPipe,
    LoginComponent,
    SignupComponent
    // FilterPipePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [
    ImageDataService,
    CategoryService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
