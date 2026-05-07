import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
})
export class Register {
  name = signal('');
  email = signal('');
  password = signal('');
  error = signal('');

  private auth = inject(Auth);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  onSubmit() {
    this.error.set('');
    if (!this.name() || !this.email() || !this.password()) {
      this.error.set('Please fill in all fields.');
      return;
    }

    if (isPlatformBrowser(this.platformId) && localStorage.getItem('nexus_user_' + this.email())) {
      this.error.set('User already exists.');
      return;
    }

    const success = this.auth.register(this.name(), this.email(), this.password());
    if (success) {
      this.router.navigate(['/profile']);
    }
  }
}