import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  isDarkTheme = true;
  
  navItems: NavItem[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'About', route: '/#about', exact: false },
    { label: 'Experience', route: '/experience', exact: false },
    { label: 'Projects', route: '/projects', exact: false },
    { label: 'Skills', route: '/skills', exact: false },
    { label: 'Contact', route: '/contact', exact: false }
  ];
  
  constructor(private themeService: ThemeService, private router: Router) {}
  
  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme();
    
    // Handle fragment navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const urlTree = this.router.parseUrl(this.router.url);
      if (urlTree.fragment) {
        setTimeout(() => {
          const fragmentId = urlTree.fragment as string;
          const element = document.getElementById(fragmentId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    });
  }
  
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.toggle('no-scroll', this.isMenuOpen);
  }
  
  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.classList.remove('no-scroll');
  }
  
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setTheme(this.isDarkTheme ? 'dark' : 'light');
  }
}
