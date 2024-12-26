import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { ActivityDashboardComponent } from './features/activities/dashboard/activity-dashboard/activity-dashboard.component';
import { ActivityformComponent } from './features/activities/form/activityform/activityform.component';

export const routes: Routes = [
    
    {path: '', component: HomeComponent},
    {path: 'activities', component: ActivityDashboardComponent},
    {path: 'createActivity', component: ActivityformComponent},
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'}


];
