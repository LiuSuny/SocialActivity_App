import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Reactivities';
  //emitting from child to parent class
  @Output() handleFormOpen = new EventEmitter<void>();

  onAddActivity(): void {
    this.handleFormOpen.emit();
  }
}
