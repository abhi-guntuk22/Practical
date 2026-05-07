import { Component, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
})
export class Profile {
  auth = inject(Auth);
  platformId = inject(PLATFORM_ID);

  isEditing = signal(false);
  bioDraft = signal('');
  successMessage = signal('');

  constructor() {
    effect(() => {
      const user = this.auth.currentUser();
      if (user) {
        this.bioDraft.set(user.bio || "");
      }
    }, { allowSignalWrites: true });
  }

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
    if (!this.isEditing()) {
        const user = this.auth.currentUser();
        if (user && isPlatformBrowser(this.platformId)) {
           user.bio = this.bioDraft();
           this.auth.currentUser.set(user);
           localStorage.setItem('nexus_current_user', JSON.stringify(user));
           localStorage.setItem('nexus_user_' + user.email, JSON.stringify(user));
           this.successMessage.set('Profile updated successfully!');
           setTimeout(() => this.successMessage.set(''), 3000);
        }
    }
  }
}