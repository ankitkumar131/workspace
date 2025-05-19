import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillCardComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
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
          stagger('50ms', [
            animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class SkillsComponent {
  activeCategory: string = 'all';
  
  skillCategories: SkillCategory[] = [
    {
      id: 'all',
      name: 'All Skills',
      icon: 'apps',
      color: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: 'desktop_windows',
      color: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'dns',
      color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)'
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: 'cloud',
      color: 'linear-gradient(135deg, #10b981, #34d399)'
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: 'build',
      color: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
    }
  ];
  
  skills: Skill[] = [
    // Frontend
    {
      name: 'HTML',
      level: 90,
      category: 'frontend',
      icon: 'html',
      color: 'linear-gradient(135deg, #e34c26, #f06529)'
    },
    {
      name: 'CSS',
      level: 85,
      category: 'frontend',
      icon: 'css',
      color: 'linear-gradient(135deg, #264de4, #2965f1)'
    },
    {
      name: 'JavaScript',
      level: 85,
      category: 'frontend',
      icon: 'javascript',
      color: 'linear-gradient(135deg, #f7df1e, #f0db4f)'
    },
    {
      name: 'Angular',
      level: 80,
      category: 'frontend',
      icon: 'code',
      color: 'linear-gradient(135deg, #dd0031, #c3002f)'
    },
    {
      name: 'Bootstrap',
      level: 85,
      category: 'frontend',
      icon: 'dashboard',
      color: 'linear-gradient(135deg, #7952b3, #8c68cd)'
    },
    {
      name: 'Tailwind CSS',
      level: 80,
      category: 'frontend',
      icon: 'style',
      color: 'linear-gradient(135deg, #38bdf8, #0ea5e9)'
    },
    
    // Backend
    {
      name: 'Node.js',
      level: 80,
      category: 'backend',
      icon: 'dns',
      color: 'linear-gradient(135deg, #68a063, #3c873a)'
    },
    {
      name: 'Express.js',
      level: 75,
      category: 'backend',
      icon: 'http',
      color: 'linear-gradient(135deg, #000000, #333333)'
    },
    {
      name: 'MongoDB',
      level: 75,
      category: 'backend',
      icon: 'storage',
      color: 'linear-gradient(135deg, #4db33d, #3f9c35)'
    },
    {
      name: 'MySQL',
      level: 70,
      category: 'backend',
      icon: 'storage',
      color: 'linear-gradient(135deg, #00758f, #f29111)'
    },
    {
      name: 'Python',
      level: 75,
      category: 'backend',
      icon: 'code',
      color: 'linear-gradient(135deg, #306998, #ffd43b)'
    },
    {
      name: 'Java',
      level: 65,
      category: 'backend',
      icon: 'code',
      color: 'linear-gradient(135deg, #5382a1, #f89820)'
    },
    
    // Cloud
    {
      name: 'Google Cloud',
      level: 70,
      category: 'cloud',
      icon: 'cloud',
      color: 'linear-gradient(135deg, #4285f4, #34a853)'
    },
    {
      name: 'AWS',
      level: 65,
      category: 'cloud',
      icon: 'cloud',
      color: 'linear-gradient(135deg, #ff9900, #232f3e)'
    },
    {
      name: 'Docker',
      level: 70,
      category: 'cloud',
      icon: 'view_in_ar',
      color: 'linear-gradient(135deg, #2496ed, #0db7ed)'
    },
    {
      name: 'Kubernetes',
      level: 60,
      category: 'cloud',
      icon: 'view_in_ar',
      color: 'linear-gradient(135deg, #326ce5, #2e5bdc)'
    },
    
    // Tools
    {
      name: 'Git',
      level: 85,
      category: 'tools',
      icon: 'merge_type',
      color: 'linear-gradient(135deg, #f05032, #f34f29)'
    },
    {
      name: 'GitHub',
      level: 85,
      category: 'tools',
      icon: 'code',
      color: 'linear-gradient(135deg, #24292e, #2b3137)'
    },
    {
      name: 'Linux',
      level: 75,
      category: 'tools',
      icon: 'terminal',
      color: 'linear-gradient(135deg, #fcc624, #d9b318)'
    },
    {
      name: 'Windows',
      level: 90,
      category: 'tools',
      icon: 'desktop_windows',
      color: 'linear-gradient(135deg, #0078d7, #0063b1)'
    }
  ];
  
  get filteredSkills(): Skill[] {
    if (this.activeCategory === 'all') {
      return this.skills;
    }
    
    return this.skills.filter(skill => skill.category === this.activeCategory);
  }
  
  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }
}