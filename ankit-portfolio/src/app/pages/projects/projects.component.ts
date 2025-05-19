import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  codeUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('staggerFade', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('800ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class ProjectsComponent {
  filters: string[] = ['All', 'AI/ML', 'Web Development', 'Cloud'];
  activeFilter: string = 'All';
  
  projects: Project[] = [
    {
      title: 'Desmoke Dehaze AI',
      description: 'AI capable of detecting and removing smoke in real-time across various media formats: images, video, and live video streams.',
      imageUrl: 'assets/images/projects/desmoke-dehaze.jpg',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
      category: 'AI/ML',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Image Generator',
      description: 'Employs Python Tkinter for constructing the graphical user interface (GUI), ensuring a user-friendly interface.',
      imageUrl: 'assets/images/projects/image-generator.jpg',
      technologies: ['Python', 'Tkinter', 'Unsplash API'],
      category: 'Web Development',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Stock Market Trading Simulation App',
      description: 'Developed a GUI application using Python and Tkinter for simulating stock trading, allowing users to manage a virtual stock portfolio and watchlist.',
      imageUrl: 'assets/images/projects/stock-market.jpg',
      technologies: ['Python', 'Tkinter', 'Yahoo Finance API', 'JSON'],
      category: 'Web Development',
      demoUrl: '#',
      codeUrl: '#'
    }
  ];
  
  get filteredProjects(): Project[] {
    if (this.activeFilter === 'All') {
      return this.projects;
    }
    
    return this.projects.filter(project => project.category === this.activeFilter);
  }
  
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }
}