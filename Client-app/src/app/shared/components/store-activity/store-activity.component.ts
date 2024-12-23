import { Component, inject, OnInit } from '@angular/core';
import { LoadingComponent } from "../loading/loading.component";
import { HeaderComponent } from "../../../layout/header/header.component";
import { ActivityDashboardComponent } from "../../../features/activities/dashboard/activity-dashboard/activity-dashboard.component";
import { Activity } from '../../models/activity';
import { v4 as uuid } from 'uuid';
import { ActivityService } from '../../../core/services/activity.service';

@Component({
  selector: 'app-store-activity',
  standalone: true,
  imports: [LoadingComponent, HeaderComponent, ActivityDashboardComponent],
  templateUrl: './store-activity.component.html',
  styleUrl: './store-activity.component.css'
})
export class StoreActivityComponent implements OnInit{

  activities: Activity[] = [];

  private activityService = inject(ActivityService); //getting hold of the service

  selectedActivity?: Activity; //selected activity

  editMode = false;

  //for loading indicator
  loading = true;

  //finding out if our submit works
  submitting: boolean = false;

  get activityByDate() {
    return Array.from(this.activities.values())
       .sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
  }
  
  //getting hold of all the activity 
  ngOnInit(): void {
    this.activityService.getActivities().subscribe({
      next: (response) => {
        this.activities = response.map((activity) => ({
          ...activity,       
          date: activity.date.split('T')[0],
          
        }))     
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
        if(this.selectedActivity?.id ===id) this.handleCancelSelect();
        this.submitting = false;
      },
      error: (err) => {
        console.error(err);
        this.submitting = false;
      },
    });
  }
  
}
