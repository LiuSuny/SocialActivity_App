import { Component, inject, OnInit, signal} from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { ActivityDashboardComponent } from "./features/activities/dashboard/activity-dashboard/activity-dashboard.component";
import { Activity } from './shared/models/activity';
import { ActivityService } from './core/services/activity.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ActivityDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  activities: Activity[] = [];

  private activityService = inject(ActivityService); //getting hold of the service

  selectedActivity?: Activity; //selected activity

  editMode = false;

  
  //getting hold of all the activity 
  ngOnInit(): void {
    this.activityService.getActivities().subscribe((activities) => {
      this.activities = activities;
    });
  }
  
  //selecting activity with id
  selectActivity(id: string): void {
    this.selectedActivity = this.activities.find((x) => x.id === id);
  }
 
  //cancel selected activity
  cancelSelect(): void {
    this.selectedActivity = undefined;
  }

  openForm(id?: string): void {
    //open the form with id if true select activity else cancel select activity
    if(id){
      this.selectActivity(id);
    } else{
      this.cancelSelect();
    }
    //id ? this.selectActivity(id) : this.cancelSelect();
    this.editMode = true;
  }
  
  //close the form
  closeForm(): void {
    this.editMode = false;
  }
   
  //perform upsert method although this is not save to the back yet 
  createOrEditActivity(activity: Activity): void {
    if (activity.id) {
      this.activities = this.activities.filter((x) => x.id !== activity.id);
    } else {
      activity.id = uuid();
    }
    this.activities = [...this.activities, activity]; //coying from the previous activity to new activity
    this.editMode = false; 
    this.selectedActivity = activity; //next select
  }
  
   //remove from memory
  deleteActivity(id: string): void {
    this.activities = this.activities.filter((x) => x.id !== id);
  }
  
}
