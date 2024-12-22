import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-activitylist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './activitylist.component.html',
  styleUrl: './activitylist.component.css'
})
export class ActivitylistComponent {
  
  @Input() activities: Activity[] = [];
  
  @Output() selectActivity = new EventEmitter<string>();
  @Output() deleteActivity = new EventEmitter<string>();

  onSelectActivity(id: string): void {
    this.selectActivity.emit(id);
  }

  onDeleteActivity(id: string): void {
    this.deleteActivity.emit(id);
  }

}
