import { Component} from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { ActivityDashboardComponent } from "./features/activities/dashboard/activity-dashboard/activity-dashboard.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ActivityDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
 
}
