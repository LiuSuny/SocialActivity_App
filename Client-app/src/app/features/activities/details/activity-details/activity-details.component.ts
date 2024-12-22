import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})
export class ActivityDetailsComponent {

  @Input() activity!: Activity;
  
  @Output() cancelSelectActivity = new EventEmitter<void>();
  @Output() openForm = new EventEmitter<string>();

  onEdit(): void {
    this.openForm.emit(this.activity.id);
  }

  onCancel(): void {
    this.cancelSelectActivity.emit();
  }
}
