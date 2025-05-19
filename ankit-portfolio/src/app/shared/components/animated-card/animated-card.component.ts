import { Component, ElementRef, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-animated-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-card.component.html',
  styleUrl: './animated-card.component.scss'
})
export class AnimatedCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('card') cardElement!: ElementRef;
  @Input() glass: boolean = true;
  @Input() hoverEffect: boolean = true;
  @Input() tiltEffect: boolean = true;
  @Input() shineEffect: boolean = true;
  @Input() backgroundColor: string = '';
  
  private mouseX = 0;
  private mouseY = 0;
  private cardRect: DOMRect | null = null;
  private mouseMoveListener: any;
  private mouseLeaveListener: any;
  private mouseEnterListener: any;
  
  ngAfterViewInit() {
    if (this.tiltEffect) {
      this.setupTiltEffect();
    }
  }
  
  ngOnDestroy() {
    this.removeEventListeners();
  }
  
  private setupTiltEffect() {
    const card = this.cardElement.nativeElement;
    
    this.mouseMoveListener = this.onMouseMove.bind(this);
    this.mouseLeaveListener = this.onMouseLeave.bind(this);
    this.mouseEnterListener = this.onMouseEnter.bind(this);
    
    card.addEventListener('mousemove', this.mouseMoveListener);
    card.addEventListener('mouseleave', this.mouseLeaveListener);
    card.addEventListener('mouseenter', this.mouseEnterListener);
  }
  
  private removeEventListeners() {
    if (!this.cardElement) return;
    
    const card = this.cardElement.nativeElement;
    
    if (this.mouseMoveListener) {
      card.removeEventListener('mousemove', this.mouseMoveListener);
    }
    
    if (this.mouseLeaveListener) {
      card.removeEventListener('mouseleave', this.mouseLeaveListener);
    }
    
    if (this.mouseEnterListener) {
      card.removeEventListener('mouseenter', this.mouseEnterListener);
    }
  }
  
  private onMouseMove(e: MouseEvent) {
    const card = this.cardElement.nativeElement;
    this.cardRect = card.getBoundingClientRect();
    
    this.mouseX = e.clientX - this.cardRect.left;
    this.mouseY = e.clientY - this.cardRect.top;
    
    const centerX = this.cardRect.width / 2;
    const centerY = this.cardRect.height / 2;
    
    const rotateX = (this.mouseY - centerY) / 10;
    const rotateY = (centerX - this.mouseX) / 10;
    
    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    if (this.shineEffect) {
      const shine = card.querySelector('.card-shine');
      if (shine) {
        const percentX = this.mouseX / this.cardRect.width;
        const percentY = this.mouseY / this.cardRect.height;
        
        gsap.to(shine, {
          backgroundPosition: `${percentX * 100}% ${percentY * 100}%`,
          opacity: 0.15,
          duration: 0.3
        });
      }
    }
  }
  
  private onMouseLeave() {
    const card = this.cardElement.nativeElement;
    
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    if (this.shineEffect) {
      const shine = card.querySelector('.card-shine');
      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          duration: 0.5
        });
      }
    }
  }
  
  private onMouseEnter() {
    if (this.shineEffect) {
      const shine = this.cardElement.nativeElement.querySelector('.card-shine');
      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          duration: 0
        });
      }
    }
  }
}