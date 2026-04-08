import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character';
import { CharacterFilterComponent } from '../characterfilter/characterfilter.component';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule, CharacterFilterComponent],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.css'
})
export class CharacterListComponent {
  private readonly harryPotterService = inject(HarryPotterService);

  readonly characters = signal<Character[]>([]);
  readonly selectedHouse = signal('All');
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  readonly filteredCharacters = computed(() => this.characters());

  constructor() {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.harryPotterService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data.filter((character) => !!character.id));
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load Harry Potter characters right now.');
        this.loading.set(false);
      }
    });
  }

  loadCharactersByHouse(house: string): void {
    this.loading.set(true);
    this.errorMessage.set('');

    if (house === 'All') {
      this.loadCharacters();
      return;
    }

    if (house === 'No House') {
      this.harryPotterService.getAllCharacters().subscribe({
        next: (data) => {
          this.characters.set(data.filter((character) => !!character.id && !character.house));
          this.loading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to load Harry Potter characters right now.');
          this.loading.set(false);
        }
      });
      return;
    }

    this.harryPotterService.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters.set(data.filter((character) => !!character.id));
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load Harry Potter characters for this house.');
        this.loading.set(false);
      }
    });
  }

  onHouseChanged(house: string): void {
    this.selectedHouse.set(house);
    this.loadCharactersByHouse(house);
  }

  trackById(index: number, character: Character): string {
    return character.id || `${character.name}-${index}`;
  }
}