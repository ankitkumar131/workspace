import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Ankit Kumar | MEAN-Stack Developer & Cloud Enthusiast'
  },
  { 
    path: 'experience', 
    component: ExperienceComponent,
    title: 'Experience & Education | Ankit Kumar'
  },
  { 
    path: 'projects', 
    component: ProjectsComponent,
    title: 'Projects | Ankit Kumar'
  },
  { 
    path: 'skills', 
    component: SkillsComponent,
    title: 'Skills | Ankit Kumar'
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    title: 'Contact | Ankit Kumar'
  },
  { path: '**', redirectTo: '' }
];
