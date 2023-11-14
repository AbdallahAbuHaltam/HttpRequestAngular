import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts:Post[] = [];
  isFetching=false;
  error=null;
  private errorSub:Subscription;

  constructor(private postService:PostsService) {}

  ngOnInit() {
    this.errorSub=this.postService.error.subscribe(
      errorMessage=>{
        this.error=errorMessage;
      }
    );
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

  onHandle(){
    this.error=null;
  }

  private fetchPosts(){
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(
      (posts)=>{
        this.isFetching=false;
        this.loadedPosts=posts;
      },error=>{
        this.isFetching=false;
        this.error=error.message
      }
    );
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
