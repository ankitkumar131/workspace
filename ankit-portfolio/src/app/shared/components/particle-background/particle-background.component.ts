import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Container, Engine, tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-particle-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './particle-background.component.html',
  styleUrl: './particle-background.component.scss'
})
export class ParticleBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('particleContainer', { static: true }) particleContainer!: ElementRef;
  @Input() particleColor: string = '#3b82f6';
  @Input() particleOpacity: number = 0.5;
  @Input() particleNumber: number = 80;
  @Input() particleSpeed: number = 3;
  @Input() particleSize: number = 3;
  @Input() lineColor: string = '#3b82f6';
  @Input() lineOpacity: number = 0.15;
  @Input() lineWidth: number = 1;
  @Input() moveDirection: string = 'none';
  @Input() hoverEffect: boolean = true;
  @Input() clickEffect: boolean = true;
  
  private container?: Container;
  private themeSubscription?: Subscription;
  private isDarkTheme: boolean = true;
  private isBrowser: boolean;
  
  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  async ngOnInit() {
    this.themeSubscription = this.themeService.getTheme().subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
      if (this.container) {
        this.updateParticleColors();
      }
    });
    
    if (this.isBrowser) {
      await this.initParticles();
    }
  }
  
  ngOnDestroy() {
    if (this.container) {
      this.container.destroy();
    }
    
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  
  private async initParticles() {
    if (!this.isBrowser) return;
    
    try {
      const engine = await this.initEngine();
      
      // Use the loadJSON method instead of createContainer
      this.container = await engine.load(this.particleContainer.nativeElement.id, {
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: this.particleNumber,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: this.particleColor
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: this.particleOpacity,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: this.particleSize,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          // @ts-ignore - tsparticles has type issues
          links: {
            enable: true,
            distance: 150,
            color: this.lineColor,
            opacity: this.lineOpacity,
            width: this.lineWidth
          },
          move: {
            enable: true,
            speed: this.particleSpeed,
            direction: this.moveDirection as any,
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: this.hoverEffect,
              mode: 'grab'
            },
            onclick: {
              enable: this.clickEffect,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    } catch (error) {
      console.error('Error initializing particles:', error);
    }
  }
  
  private async initEngine(): Promise<Engine> {
    if (!this.isBrowser) {
      // Return a mock engine for SSR
      return {} as Engine;
    }
    
    try {
      // @ts-ignore - tsparticles has type issues
      const engine = await loadFull(tsParticles);
      // @ts-ignore - tsparticles has type issues
      return engine;
    } catch (error) {
      console.error('Error loading tsParticles:', error);
      return {} as Engine;
    }
  }
  
  private updateParticleColors() {
    if (!this.container || !this.isBrowser) return;
    
    try {
      const particles = this.container.options.particles;
      if (!particles) return;
      
      if (this.isDarkTheme) {
        // @ts-ignore - tsparticles has type issues
        if (particles.color) particles.color.value = this.particleColor;
        // @ts-ignore - tsparticles has type issues
        if (particles.links) particles.links.color = this.lineColor;
      } else {
        // @ts-ignore - tsparticles has type issues
        if (particles.color) particles.color.value = '#1e293b';
        // @ts-ignore - tsparticles has type issues
        if (particles.links) particles.links.color = '#1e293b';
      }
      
      this.container.refresh();
    } catch (error) {
      console.error('Error updating particle colors:', error);
    }
  }
}