import { Component, OnInit } from '@angular/core';
import { Photo } from "../../models/photo";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as firebase from 'firebase';
import { AuthService } from "../services/auth.service";
import { MdDialogConfig, MdDialog, MdSnackBar } from "@angular/material";
import { EditPhotoComponent } from "../edit-photo/edit-photo.component";
import { PostService } from "../services/post.service";

@Component({
  selector: 'app-full-photo',
  templateUrl: './full-photo.component.html',
  styleUrls: ['./full-photo.component.scss']
})
export class FullPhotoComponent implements OnInit {
  photoWithAuthor: Photo;
  url: string;
  caption: string;
  key: string;

  constructor(private dialog: MdDialog, private snackBar: MdSnackBar, public postService: PostService, private route: ActivatedRoute, private router: Router, public authService: AuthService) {
    this.route.params.subscribe((routeParams: Params) => {
      this.key = routeParams['photoKey'];
      this.initializePhoto(this.key);
    });
  }

  ngOnInit() {
  }

  initializePhoto(key: string) {
    const photofromDb = firebase.database().ref(`/photos/${key}`);

    photofromDb.on('value', (snapshot) => {
      this.photoWithAuthor = snapshot.val();
    });
  }

  displayEditOptions() {
    return (this.photoWithAuthor.uid === this.authService._currentUsersUid);
  }

  goBack() {
    this.router.navigate(['/']);
  }

 enableEditing() {
    this.url = this.photoWithAuthor.url;
    this.caption = this.photoWithAuthor.caption;

    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      url: this.photoWithAuthor.url,
      caption: this.photoWithAuthor.caption,
      key: this.key,
      uid: this.photoWithAuthor.uid,
    };

    this.dialog.open(EditPhotoComponent, dialogConfig);
  }

  delete() {
    this.postService.remove(this.key);
    this.router.navigate(['/']);
    const sbRef = this.snackBar.open('Photo removed', '', {
      duration: 5000,
    });
  }

}
