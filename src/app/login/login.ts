import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    // Validation
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Username and password are required';
      this.showError = true;
      return;
    }

    if (this.username.length < 3) {
      this.errorMessage = 'Username must be at least 3 characters';
      this.showError = true;
      return;
    }

    if (this.password.length < 5) {
      this.errorMessage = 'Password must be at least 5 characters';
      this.showError = true;
      return;
    }

    this.isLoading = true;
    this.showError = false;

    // Simulate network delay
    setTimeout(() => {
      const isValid = this.authService.login(this.username, this.password);

      if (isValid) {
        this.isLoading = false;
        this.router.navigate(['/home']); // ✅ redirect after login
      } else {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password. Try: admin / admin123';
        this.showError = true;
        this.password = '';
      }
    }, 800);
  }

  // Allow login with Enter key
  onKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}