import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Activity } from '../../../../shared/models/activity';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-activityform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './activityform.component.html',
  styleUrl: './activityform.component.css'
})
export class ActivityformComponent implements OnInit{
  
  @Input() activity?: Activity;

  @Output() closeForm = new EventEmitter<void>();
  @Output() createOrEdit = new EventEmitter<Activity>();

  activityForm!: FormGroup;

  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.activityForm = this.fb.group({
      id: [this.activity?.id || ''],
      title: [this.activity?.title || '', Validators.required],
      category: [this.activity?.category || '', Validators.required],
      description: [this.activity?.description || '', Validators.required],
      date: [this.activity?.date || '', Validators.required],
      city: [this.activity?.city || '', Validators.required],
      venue: [this.activity?.venue || '', Validators.required],
    });
  }

  //handle submit
  onSubmit(): void {
    if (this.activityForm.valid) {
      this.createOrEdit.emit(this.activityForm.value);
    }
  }

  onCancel(): void {
    this.closeForm.emit();
  }
}
