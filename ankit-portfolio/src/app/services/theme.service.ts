import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private theme = new BehaviorSubject<Theme>('dark');
  private isBrowser: boolean;
  
  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initTheme();
  }
  
  private initTheme(): void {
    // Default to dark theme for SSR
    let theme: Theme = 'dark';
    
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      theme = savedTheme || (prefersDark ? 'dark' : 'light');
    }
    
    this.setTheme(theme);
  }
  
  setTheme(theme: Theme): void {
    this.theme.next(theme);
    
    if (!this.isBrowser) {
      return;
    }
    
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
      
      // Update CSS variables for dark theme
      document.documentElement.style.setProperty('--bg-primary', '#0f172a');
      document.documentElement.style.setProperty('--bg-secondary', '#1e293b');
      document.documentElement.style.setProperty('--bg-tertiary', '#334155');
      document.documentElement.style.setProperty('--text-primary', '#f8fafc');
      document.documentElement.style.setProperty('--text-secondary', '#94a3b8');
      document.documentElement.style.setProperty('--text-tertiary', '#64748b');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
      
      // Update CSS variables for light theme
      document.documentElement.style.setProperty('--bg-primary', '#f8fafc');
      document.documentElement.style.setProperty('--bg-secondary', '#f1f5f9');
      document.documentElement.style.setProperty('--bg-tertiary', '#e2e8f0');
      document.documentElement.style.setProperty('--text-primary', '#0f172a');
      document.documentElement.style.setProperty('--text-secondary', '#334155');
      document.documentElement.style.setProperty('--text-tertiary', '#64748b');
    }
  }
  
  getTheme(): Observable<Theme> {
    return this.theme.asObservable();
  }
  
  isDarkTheme(): boolean {
    return this.theme.getValue() === 'dark';
  }
  
  toggleTheme(): void {
    const currentTheme = this.theme.getValue();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}
