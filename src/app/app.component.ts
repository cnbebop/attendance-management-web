import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'attendance-management';
  displayedColumns: string[] = ['id', 'name'];

  userList: User[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<User[]>('http://www.cnbebop.com:3000').subscribe(response => {
      console.log(response)
      this.userList = response;
    });
  }
}
