import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Balão - Cursos Online';

  isLoggedIn: boolean; 

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn(); 
  }

  // Função para fazer logout
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
