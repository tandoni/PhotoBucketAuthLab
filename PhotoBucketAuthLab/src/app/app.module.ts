import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SignInComponent } from "./+sign-in/sign-in.component";
import { MainComponent } from "./+main/main.component";

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { AuthService } from "./services/auth.service";
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { FormsModule } from "@angular/forms";
import { PostService } from "./services/post.service";
import { ReversePipe } from './pipes/reverse.pipe';
import { MyPostsComponent } from "./+my-posts/my-posts.component";
import { AuthGuard } from "./services/auth.guard";
import { FullPhotoComponent } from './full-photo/full-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';


export const MaterialModules = [
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainComponent,
    CreatePostComponent,
    PostComponent,
    PostListComponent,
    ReversePipe,
    MyPostsComponent,
    FullPhotoComponent,
    EditPhotoComponent,
  ],
  entryComponents: [
    CreatePostComponent,
    EditPhotoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModules,
    FormsModule,
  ],
  providers: [AuthService, PostService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
