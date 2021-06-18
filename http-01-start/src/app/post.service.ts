import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
        postData).subscribe(responseData => {
          console.log(responseData);
        }, error => {
          this.error.next(error.message);
        });
  }

  fetchPosts()
  {
    return this.http.get<{[key: string]: Post}>('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map( (responseData) => {
      const postsArray: Post[] = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key})
        }}
      return postsArray;
    })
    );
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json')
  }

}
