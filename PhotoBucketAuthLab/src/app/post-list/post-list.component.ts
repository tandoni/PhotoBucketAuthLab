import { Component, OnInit } from '@angular/core';
import { PostService } from "../services/post.service";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs/Observable";
import { Photo } from "../../models/photo";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  allPhotosStream: Observable<Photo[]>;

  constructor(public authService: AuthService, private db: AngularFireDatabase) { 
        this.allPhotosStream = this.db.list("/photos");
  }

  ngOnInit() {
    // this.postService.showOnlyMyPosts(false);
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
