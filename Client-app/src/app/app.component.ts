import { Component} from '@angular/core';

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
