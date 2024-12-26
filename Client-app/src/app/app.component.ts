import { Component} from '@angular/core';

import { StoreActivityComponent } from "./shared/components/store-activity/store-activity.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  
}