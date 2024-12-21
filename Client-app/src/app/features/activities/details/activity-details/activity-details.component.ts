import { Component, Input } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})
export class ActivityDetailsComponent {

  @Input() activities?:Activity;
}
