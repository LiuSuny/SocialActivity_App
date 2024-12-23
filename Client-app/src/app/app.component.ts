import { Component, inject, OnInit, signal} from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { ActivityDashboardComponent } from "./features/activities/dashboard/activity-dashboard/activity-dashboard.component";
import { Activity } from './shared/models/activity';
import { ActivityService } from './core/services/activity.service';
import { v4 as uuid } from 'uuid';
import { LoadingComponent } from "./shared/components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ActivityDashboardComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  activities: Activity[] = [];

  private activityService = inject(ActivityService); //getting hold of the service

  selectedActivity?: Activity; //selected activity

  editMode = false;

  //for loading indicator
  loading = true;

  //finding out if our submit works
  submitting: boolean = false;

  
  //getting hold of all the activity 
  ngOnInit(): void {
    this.activityService.getActivities().subscribe({
      next: (response) => {
        this.activities = response.map((activity) => ({
          ...activity,
          date: activity.date.split('T')[0],
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
  
  //selecting activity with id
  handleSelectActivity(id: string): void {
    this.selectedActivity = this.activities.find((x) => x.id === id);
  }
 
  //cancel selected activity
  handleCancelSelect(): void {
    this.selectedActivity = undefined;
  }

  handleFormOpen(id?: string): void {
    //open the form with id if true select activity else cancel select activity
    if(id){
      this.handleSelectActivity(id);
    } else{
      this.handleCancelSelect();
    }
    //id ? this.selectActivity(id) : this.cancelSelect();
    this.editMode = true;
  }
  
  //close the form
  handleFormClose(): void {
    this.editMode = false;
  }
   
  //perform upsert method although this is not save to the back yet 
  handleCreateOrEditActivity(activity: Activity): void {
    
    this.submitting = true;
    if (activity.id) {
      this.activityService.update(activity).subscribe({
        next: () => {
          this.activities = [
            ...this.activities.filter((x) => x.id !== activity.id),
            activity,
          ];
          this.selectedActivity = activity;
          this.editMode = false;
          this.submitting = false;
        },
        error: (err) => {
          console.error(err);
          this.submitting = false;
        },
      });
    } else {
      activity.id = uuid();
      this.activityService.create(activity).subscribe({
        next: () => {
          this.activities = [...this.activities, activity];
          this.selectedActivity = activity;
          this.editMode = false;
          this.submitting = false;
        },
        error: (err) => {
          console.error(err);
          this.submitting = false;
        },
      });
    }
  }
  
   //remove from memory
   handleDeleteActivity(id: string): void {
    this.submitting = true;
    this.activityService.delete(id).subscribe({
      next: () => {
        this.activities = this.activities.filter((x) => x.id !== id);
        this.submitting = false;
      },
      error: (err) => {
        console.error(err);
        this.submitting = false;
      },
    });
  }
  
}
