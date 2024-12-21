import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';
import { ActivitylistComponent } from "../activitylist/activitylist.component";
import { ActivityDetailsComponent } from "../../details/activity-details/activity-details.component";

@Component({
  selector: 'app-activity-dashboard',
  standalone: true,
  imports: [ActivitylistComponent, ActivityDetailsComponent],
  templateUrl: './activity-dashboard.component.html',
  styleUrl: './activity-dashboard.component.css'
})

export class ActivityDashboardComponent implements OnInit{
 
  baseUrl ='http://localhost:5000/api/';
 
  private http = inject(HttpClient);
  

  activities:Activity[] = [];

 ngOnInit(){
     this.getActivity();   
 }
  
 getActivity(){

  this.http.get<Activity[]>(this.baseUrl + 'activities')
     .subscribe({   
       next: (response) => {
        //this.activities = response as string[]
        this.activities = response 
       },
       error: (error) => console.log(error),
       complete: () => console.log('complete')
    })
 }
}
