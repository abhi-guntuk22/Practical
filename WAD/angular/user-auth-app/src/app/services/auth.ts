import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  currentUser = signal<any>(null);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('nexus_current_user');
      if (user) {
        this.currentUser.set(JSON.parse(user));
      }
    }
  }

  register(name: string, email: string, pass: string) {
    if (!isPlatformBrowser(this.platformId)) return false;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const user = { name, email, password: pass, bio: 'Ready to explore?', joined: `Member since ${date}` };
    localStorage.setItem('nexus_user_' + email, JSON.stringify(user));
    this.currentUser.set(user);
    localStorage.setItem('nexus_current_user', JSON.stringify(user));
    return true;
  }

  login(email: string, pass: string) {
    if (!isPlatformBrowser(this.platformId)) return false;
    const stored = localStorage.getItem('nexus_user_' + email);
    if (!stored) return false;
    const user = JSON.parse(stored);
    if (user.password === pass) {
      this.currentUser.set(user);
      localStorage.setItem('nexus_current_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('nexus_current_user');
    }
  }
}
