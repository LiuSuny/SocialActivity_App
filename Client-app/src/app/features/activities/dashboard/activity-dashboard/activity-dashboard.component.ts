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
  
 //emitting all the method to the parent class which is app.component html
 @Output() selectActivity = new EventEmitter<string>();
 @Output() cancelSelect = new EventEmitter<void>();
 @Output() openForm = new EventEmitter<string | undefined>();
 @Output() closeForm = new EventEmitter<void>();
 @Output() createOrEdit = new EventEmitter<Activity>();
 @Output() deleteActivity = new EventEmitter<string>();

 
 onSelectActivity(id: string): void {
   this.selectActivity.emit(id);
 }

 onCancelSelect(): void {
   this.cancelSelect.emit();
 }

 onOpenForm(id?: string): void {
   this.openForm.emit(id);
 }

 onCloseForm(): void {
   this.closeForm.emit();
 }

 onCreateOrEdit(activity: Activity): void {
   this.createOrEdit.emit(activity);
 }

 onDeleteActivity(id: string): void {
   this.deleteActivity.emit(id);
 }

}
