import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    // URL provided by the firebase Database by Google
    this.http.post<{name: string}>('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json',
    postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.http.get<{[key: string]: Post}>('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json')
    .pipe(map( (responseData) => {
      const postsArray: Post[] = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key})
        }}
      return postsArray;
    }))
    .subscribe((posts)=> {
      //console.log(posts);
      this.loadedPosts = posts;
    });
  }
}
