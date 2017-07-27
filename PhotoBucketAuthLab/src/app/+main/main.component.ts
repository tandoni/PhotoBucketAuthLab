import { Component, OnInit } from '@angular/core';
import { MdDialogConfig, MdDialog } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../services/auth.service";
import { CreatePostComponent } from "../create-post/create-post.component";
import { PostService } from "../services/post.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  url: string;
  caption: string;

  constructor(private dialog: MdDialog, public authService: AuthService) {
    // this.authService.signInJustInCase();

  }

  ngOnInit() {
    // this.authService.signInJustInCase();

  }

  showPhotoDialog(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = { url: this.url, caption: this.caption };

    this.dialog.open(CreatePostComponent, dialogConfig);
  }

}
