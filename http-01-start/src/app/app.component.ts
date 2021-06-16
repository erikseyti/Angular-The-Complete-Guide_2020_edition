import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    // URL provided by the firebase Database by Google
    this.http.post('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json',
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
    this.http.get('https://ng-complete-course-3787b-default-rtdb.firebaseio.com/posts.json').
    subscribe((posts)=> {
      console.log(posts);
    });
  }
}
