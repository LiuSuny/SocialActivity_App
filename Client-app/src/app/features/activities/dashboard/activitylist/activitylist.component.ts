import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';
import { NgClass, NgFor } from '@angular/common';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-activitylist',
  standalone: true,
  imports: [NgClass ],
  templateUrl: './activitylist.component.html',
  styleUrl: './activitylist.component.css'
})
export class ActivitylistComponent {
  
  @Input() activities: Activity[] = [];
  @Input() submitting: boolean = false;

  @Output() handleSelectActivity = new EventEmitter<string>();
  @Output() handleDeleteActivity = new EventEmitter<string>();
  
  loadingStates: { [key: string]: boolean } = {};

  target: string = '';

  onSelectActivity(id: string): void {
    this.handleSelectActivity.emit(id);
  }

   onDeleteActivity(event: Event, id: string): void {
    this.loadingStates[id] = true;
  // Simulate an asynchronous operation using pure javascript
    setTimeout(() => { 
    this.target = (event.target as HTMLButtonElement).name;    
     this.handleDeleteActivity.emit(id);
     this.loadingStates[id] = false;
   }, 2000); // Adjust the timeout as needed
  }


}
  

