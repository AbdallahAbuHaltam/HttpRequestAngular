import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map ,catchError, tap} from "rxjs/operators";
import { Subject,throwError } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class PostsService{

    error=new Subject<string>();

    constructor(private http :HttpClient){}

    createAndStorePosts(title:string,content:string){
        const postData:Post={title:title,content:content}
        this.http.post<{name:string}>('https://ng-complete-guide-abc63-default-rtdb.firebaseio.com/posts.json',postData,
        {
          observe:'response'
        }
        ).subscribe(responseData=>{
      console.log(responseData);
    }),errorMessage=>{this.error.next(errorMessage)};
    }

    fetchPosts(){
        return this.http.get<{[key:string]:Post}>('https://ng-complete-guide-abc63-default-rtdb.firebaseio.com/posts.json',{
          headers:new HttpHeaders({'Custom-header':'Hello'}),
          params: new HttpParams().set('print','pretty')
        })
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
        return this.http.delete('https://ng-complete-guide-abc63-default-rtdb.firebaseio.com/posts.json',{
          observe:'response'
        }).pipe(tap(event=>{
          console.log(event);
          if(event.type===HttpEventType.Response){
            console.log(event.body);
          }
        }));
    }

}