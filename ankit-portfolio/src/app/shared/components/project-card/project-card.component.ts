import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedCardComponent } from '../animated-card/animated-card.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, AnimatedCardComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() technologies: string[] = [];
  @Input() demoUrl?: string;
  @Input() codeUrl?: string;
}