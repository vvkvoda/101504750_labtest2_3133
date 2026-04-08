import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.css'
})
export class CharacterFilterComponent {
  @Output() houseChanged = new EventEmitter<string>();

  readonly houses = signal(['All', 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw', 'No House']);
  readonly houseControl = new FormControl('All', { nonNullable: true });

  constructor() {
    this.houseControl.valueChanges.subscribe((value) => {
      this.houseChanged.emit(value ?? 'All');
    });
  }
}
