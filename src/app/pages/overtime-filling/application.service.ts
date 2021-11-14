import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  createApplication(application: any) {
    return this.http.post('http://localhost:3000/create-application', application);
  }

  getApplicationList() {
    return this.http.get('http://localhost:3000/query-applications');
  }

  getUserList() {
    return this.http.get<User[]>('http://localhost:3000/query-users');
  }
}
