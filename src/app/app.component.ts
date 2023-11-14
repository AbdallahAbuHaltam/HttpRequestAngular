import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching=false;
  error=null;

  constructor(private postService:PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePosts(postData.title,postData.content);
    
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
     }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(
      ()=>{
        this.loadedPosts=[];
      }
    )
  }

  private fetchPosts(){
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(
      (posts)=>{
        this.isFetching=false;
        this.loadedPosts=posts;
      },error=>{
        this.error=error.message
      }
    );
  }
}
