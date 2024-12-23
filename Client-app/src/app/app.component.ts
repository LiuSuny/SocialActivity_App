import { Component, inject, OnInit, signal} from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { ActivityDashboardComponent } from "./features/activities/dashboard/activity-dashboard/activity-dashboard.component";
import { Activity } from './shared/models/activity';
import { ActivityService } from './core/services/activity.service';

import { LoadingComponent } from "./shared/components/loading/loading.component";
import { StoreActivityComponent } from "./shared/components/store-activity/store-activity.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StoreActivityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  
}
