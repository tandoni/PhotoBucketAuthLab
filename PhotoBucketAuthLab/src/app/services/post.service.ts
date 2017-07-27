import { Injectable } from '@angular/core';
import { Photo } from "../../models/photo";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/Observable/combineLatest';
import 'rxjs/add/operator/scan';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as firebase from 'firebase';
import { Query } from "angularfire2/interfaces";
import { AuthService } from "./auth.service";

@Injectable()
export class PostService {
  readonly photosPath = 'photos';

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
  }

  add(photo: Photo) {
    firebase.database().ref().child(this.photosPath).push(photo);
  }

  remove(key: string) {
    firebase.database().ref().child(this.photosPath).child(key).remove();
  }

  update(key: string, photo: Photo) {
    // firebase.database().ref().child(this.postsPath).child(key).set(post);
    this.db.object(`/${this.photosPath}/${key}`).update(photo);
  }

  showOnlyMyPosts(isMyPhotosPage: boolean) {
    // this.isMyphotosPageStream.next(isMyPhotosPage);
  }
}
