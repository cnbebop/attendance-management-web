import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST_URL } from 'src/app/shared/constants/host';
import { User } from 'src/app/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  createApplication(application: any) {
    return this.http.post(`${HOST_URL}create-application`, application);
  }

  deleteApplication(id: string) {
    return this.http.delete(`${HOST_URL}application/${id}`);
  }

  getApplicationList() {
    return this.http.get(`${HOST_URL}query-applications`);
  }

  getUserList() {
    return this.http.get<User[]>(`${HOST_URL}query-users`);
  }

  createSchedulingApplication(dto: any) {
    return this.http.post(`${HOST_URL}create-scheduling-application`, dto);
  }

  getSchedulingApplicationList(startTime: string, endTime: string) {
    return this.http.get(`${HOST_URL}query-scheduling-applications`, {
      params: { startTime, endTime }
    });
  }
}
