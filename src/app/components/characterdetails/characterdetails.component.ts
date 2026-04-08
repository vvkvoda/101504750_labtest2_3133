import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.css'
})
export class CharacterDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly harryPotterService = inject(HarryPotterService);

  readonly character = signal<Character | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly wizardStatus = computed(() => (this.character()?.wizard ? 'Wizard' : 'Muggle / Unknown'));

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage.set('Character id is missing.');
      this.loading.set(false);
      return;
    }

    this.harryPotterService.getCharacterById(id).subscribe({
      next: (response) => {
        this.character.set(response[0] ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load character details.');
        this.loading.set(false);
      }
    });
  }
}
