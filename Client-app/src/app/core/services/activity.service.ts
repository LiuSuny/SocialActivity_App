import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Activity } from '../../shared/models/activity';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  baseUrl = environment.apiUrl;
 
  private http = inject(HttpClient);

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl + 'activities');
  }
}
