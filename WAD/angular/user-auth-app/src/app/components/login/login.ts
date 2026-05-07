import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  email = signal('');
  password = signal('');
  error = signal('');

  private auth = inject(Auth);
  private router = inject(Router);

  onSubmit() {
    this.error.set('');
    if (!this.email() || !this.password()) {
      this.error.set('Please fill in all fields.');
      return;
    }

    const success = this.auth.login(this.email(), this.password());
    if (success) {
      this.router.navigate(['/profile']);
    } else {
      this.error.set('Invalid credentials.');
    }
  }
}