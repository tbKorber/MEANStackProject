import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs'

import { Post } from '../post.model'
import { PostsService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'}
  // ]

  posts: Post[] = []
  private postsSub: Subscription = new Subscription()

  constructor(public postsService: PostsService) {}

  editPost() {
    console.log('edit')
  }

  deletePost() {
    console.log('delete')
  }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts()
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts
      })
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
