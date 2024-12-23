import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnInit, output, Output, signal } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';
import { ActivitylistComponent } from "../activitylist/activitylist.component";
import { ActivityDetailsComponent } from "../../details/activity-details/activity-details.component";
import { ActivityformComponent } from "../../form/activityform/activityform.component";


@Component({
  selector: 'app-activity-dashboard',
  standalone: true,
  imports: [ActivitylistComponent, ActivityDetailsComponent, ActivityformComponent],
  templateUrl: './activity-dashboard.component.html',
  styleUrl: './activity-dashboard.component.css'
})

export class ActivityDashboardComponent{
 
 @Input() activities: Activity[] = []; 
 @Input() selectedActivity?: Activity;
 @Input() editMode = false;
 
 @Input() submitting: boolean = false;

  
 //emitting all the method to the parent class which is app.component html
 @Output() handleSelectActivity = new EventEmitter<string>();
 @Output() handleCancelSelect = new EventEmitter<void>();
 @Output() handleFormOpen = new EventEmitter<string | undefined>();
 @Output() handleFormClose = new EventEmitter<void>();
 @Output() handleCreateOrEditActivity = new EventEmitter<Activity>();
 @Output() handleDeleteActivity = new EventEmitter<string>();

 
 onSelectActivity(id: string): void {
   this.handleSelectActivity.emit(id);
 }

 onCancelSelect(): void {
   this.handleCancelSelect.emit();
 }

 onOpenForm(id?: string): void {
   this.handleFormOpen.emit(id);
 }

 onCloseForm(): void {
   this.handleFormClose.emit();
 }

 onCreateOrEdit(activity: Activity): void {
   this.handleCreateOrEditActivity.emit(activity);
 }

 onDeleteActivity(id: string): void {
   this.handleDeleteActivity.emit(id);
 }

}
