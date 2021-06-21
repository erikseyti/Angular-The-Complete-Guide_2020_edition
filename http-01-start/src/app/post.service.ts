import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content}
        // URL provided by the firebase Database by Google
        this.http.post<{name: string}>(
          'https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }

        ).subscribe(responseData => {
          console.log(responseData);
        }, error => {
          this.error.next(error.message);
        });
  }

  fetchPosts() {
    let searchParms = new HttpParams();
    searchParms = searchParms.append('print', 'pretty');
    searchParms = searchParms.append('custom', 'key')

    return this.http.get<{[key: string]: Post}>('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders({"Custom-Header": 'Hello'}),
      params: searchParms
      // single param passing to HttpRequest
      //params: new HttpParams().set('print', 'pretty')
    }
    )
    .pipe(
      map( (responseData) => {
      const postsArray: Post[] = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key})
        }}
      return postsArray;
    }),
    catchError( errorRes =>{
      return throwError(errorRes);
    }));
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json',
    {
      observe: 'events'
    }
    ).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent){
        // ...
      }
      if(event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }

}
