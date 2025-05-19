import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedCardComponent } from '../animated-card/animated-card.component';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule, AnimatedCardComponent],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss'
})
export class SkillCardComponent {
  @Input() name: string = '';
  @Input() level: number = 0;
  @Input() iconBackground: string = 'var(--gradient-primary)';
}