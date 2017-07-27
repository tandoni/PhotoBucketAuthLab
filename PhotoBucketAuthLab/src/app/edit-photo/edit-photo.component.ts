import { Component, OnInit, Inject } from '@angular/core';
import { Photo } from "../../models/photo";
import * as firebase from 'firebase';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar } from '@angular/material';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { PostService } from "../services/post.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit {

  url: string;
  caption: string;
  photo: Photo;

  photoListStream: FirebaseListObservable<Photo[]>;
  dataObj: any;

  constructor(public db: AngularFireDatabase, @Inject(MD_DIALOG_DATA) public data: any, public authService: AuthService,
    public postService: PostService, private dialogRef: MdDialogRef<EditPhotoComponent>, private snackBar: MdSnackBar) {
    this.url = data.url;
    this.caption = data.caption;
    this.dataObj = data;
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

      this.postService.update(this.dataObj.$key, photo);

      // this.photoListStream.update(nextKey, photo);
      this.url = '';
      this.caption = '';
    } catch (error) {
      console.error('submit failed');
    }
  }

  save() {
    const updatedPhoto = new Photo();
    updatedPhoto.url = this.url;
    updatedPhoto.caption = this.caption;
    updatedPhoto.uid = this.dataObj.uid;
    this.postService.update(this.dataObj.key, updatedPhoto);
    const sbRef = this.snackBar.open('Photo updated', '', {
      duration: 5000,
    });
    this.dialogRef.close();
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
      // firebase.database().ref(`/photos/list/${nextKey}`).set(nextKey);
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('upload').style.display = 'block';
      document.getElementsByName('url')[0].focus();
      this.url = uploadSnapshot.downloadURL;
    });
  }

}
