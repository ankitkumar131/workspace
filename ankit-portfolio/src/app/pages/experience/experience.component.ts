import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedCardComponent } from '../../shared/components/animated-card/animated-card.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, AnimatedCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ExperienceComponent {

}