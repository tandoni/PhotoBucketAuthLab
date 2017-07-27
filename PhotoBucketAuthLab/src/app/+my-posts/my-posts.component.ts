import { Component, OnInit } from '@angular/core';
import { PostService } from "../services/post.service";
import { AuthService } from "../services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { Photo } from "../../models/photo";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  myPhotosStream: Observable<Photo[]>;

  constructor(private db: AngularFireDatabase, public authService: AuthService) {
    // this.postService.showOnlyMyPosts(true);
    // console.log("just hit my posts");
    // this.authService.signInJustInCase();
    this.myPhotosStream = this.db.list("/photos", {
      query: {
        orderByChild: "uid",
        equalTo: this.authService.currentUsersUid
      }
    });
  }

  ngOnInit() {
    // this.postService.showOnlyMyPosts(true);
  }


  get numColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else if (window.innerWidth < 1300) {
      return 3;
    }
    return 4;
  }
}
