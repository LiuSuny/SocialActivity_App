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

  details(id: string): Observable<Activity>{
     return this.http.get<Activity>(this.baseUrl + 'activities/' + id);
  }

  create(activity: Activity): Observable<void>{
    return this.http.post<void>(this.baseUrl + 'activities', activity, {});
  }

  update(activity: Activity): Observable<void>{
    return this.http.put<void>(this.baseUrl +'activities/' + activity.id, activity);
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(this.baseUrl + 'activities/' + id);
  }

}
