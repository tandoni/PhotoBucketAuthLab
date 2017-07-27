import { Component, OnInit, Inject, Input } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from "@angular/material";
import * as firebase from 'firebase';
import { AuthService } from "../services/auth.service";
import { Photo } from "../../models/photo";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { PostService } from "../services/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  url: string;
  caption: string;

  photoListStream: FirebaseListObservable<Photo[]>;

  constructor(public authService: AuthService, private db: AngularFireDatabase, public postService: PostService,
    private dialogRef: MdDialogRef<CreatePostComponent>, private snackBar: MdSnackBar) {
    this.photoListStream = this.db.list('/photos');
  }

  ngOnInit() {
  }

  onSubmit() {
    try {
      const photo = new Photo({
        url: this.url,
        caption: this.caption,
        uid: this.authService._currentUsersUid,
      });
      // firebase.database().ref().child('photos').push(photo);

      this.postService.add(photo);
      const sbRef = this.snackBar.open('Photo added', '', {
        duration: 5000,
      });

      // this.photoListStream.update(nextKey, photo);
      this.url = '';
      this.caption = '';
      this.dialogRef.close();
    } catch (error) {
      console.error('submit failed');
    }
  }

  photoSelectedForList(event: any) {
    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    const nextKey = this.photoListStream.push({}).key;
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photos/${nextKey}`);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);
    console.log(`Uploading: ${file.name}`);
    document.getElementById('spinner').style.display = 'flex';
    document.getElementById('upload').style.display = 'none';

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log(`Upload is complete!`);
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('upload').style.display = 'block';
      document.getElementsByName('url')[0].focus();
      // firebase.database().ref(`/photos/list/${nextKey}`).set(nextKey);
      this.url = uploadSnapshot.downloadURL;
    });
  }
}
