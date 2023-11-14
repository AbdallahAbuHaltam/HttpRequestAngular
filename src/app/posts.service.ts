import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map ,catchError} from "rxjs/operators";
import { Subject,throwError } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class PostsService{

    error=new Subject<string>();

    constructor(private http :HttpClient){}

    createAndStorePosts(title:string,content:string){
        const postData:Post={title:title,content:content}
        this.http.post<{name:string}>('https://ng-complete-guide-abc63-default-rtdb.firebaseio.com/posts.json',postData).subscribe(responseData=>{
      console.log(responseData);
    }),errorMessage=>{this.error.next(errorMessage)};
    }

    fetchPosts(){
        return this.http.get<{[key:string]:Post}>('https://ng-complete-guide-abc63-default-rtdb.firebaseio.com/posts.json')
        .pipe(
          map(responseData=>{
            const postsArray:Post[]=[];
            for(const key in responseData){
              if(responseData.hasOwnProperty(key)){
                postsArray.push({...responseData[key],id:key});
              }
            }
            return postsArray;
          }),catchError(errorRes=>{
            return throwError(errorRes);
          })
        );
    }

    deletePosts(){
        return this.http.delete('https://ng-complete-guide-abc63-default-rtdb.firebaseio.com/posts.json');
    }

}