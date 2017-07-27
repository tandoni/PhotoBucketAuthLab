import { Component, OnInit, Input } from '@angular/core';
import { Photo } from "../../models/photo";
import { AuthService } from "../services/auth.service";
import { PostService } from "../services/post.service";
import { MdSnackBar, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA, MdDialog } from "@angular/material";
import { Router } from "@angular/router";
import { FullPhotoComponent } from "../full-photo/full-photo.component";
import { CreatePostComponent } from "../create-post/create-post.component";
import { EditPhotoComponent } from "../edit-photo/edit-photo.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() photoWithAuthor: Photo;
  @Input() displayEditOptions: boolean;

  url: string;
  caption: string;


  constructor(private dialog: MdDialog, private authService: AuthService,
    private postService: PostService, private router: Router, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    if (this.photoWithAuthor.uid == this.authService.currentUsersUid) {
      // this.editingMode = EditMode.displayEditButtons;
    }
  }

  photoClicked(photo: Photo) {
    this.router.navigate(['/photo', photo.$key]);
  }

  enableEditing() {
    this.url = this.photoWithAuthor.url;
    this.caption = this.photoWithAuthor.caption;

    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      url: this.photoWithAuthor.url,
      caption: this.photoWithAuthor.caption,
      key: this.photoWithAuthor.$key,
      uid: this.photoWithAuthor.uid,
    };

    this.dialog.open(EditPhotoComponent, dialogConfig);
  }

  delete() {
    this.postService.remove(this.photoWithAuthor.$key);
    const sbRef = this.snackBar.open('Photo removed', '', {
      duration: 5000,
    });
  }

  save() {
    // const updatedPhoto = new Photo();
    // updatedPhoto.url = this.url;
    // updatedPhoto.caption = this.caption;
    // updatedPhoto.uid = this.authService.currentUsersUid;
    // this.postService.update(this.photoWithAuthor.$key, updatedPhoto);
    // this.editingMode = EditMode.displayEditButtons;
  }

  cancel() {
    // this.editingMode = EditMode.displayEditButtons;
  }

}
