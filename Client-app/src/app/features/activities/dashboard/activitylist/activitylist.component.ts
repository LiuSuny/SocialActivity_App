import { Component, Input } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';

@Component({
  selector: 'app-activitylist',
  standalone: true,
  imports: [],
  templateUrl: './activitylist.component.html',
  styleUrl: './activitylist.component.css'
})
export class ActivitylistComponent {
  
  @Input() activities:Activity[] = [];

}
