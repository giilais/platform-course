import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  private isAuthenticated: boolean = false;

  cadastrarUsuario(
    nome: string,
    email: string,
    senha: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, { nome, email, senha })
      .pipe(
        tap((response) => {
          console.log('Usuário cadastrado com sucesso. Token:', response.token);
          this.router.navigate(['/login']);
        })
      );
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response) => {
        console.log('Usuário logado com sucesso. Token:', response.token);
        this.router.navigate(['/']);
        this.isAuthenticated = true;
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Verifica se o usuário está autenticado
  isUsuarioAutenticado() {
    return this.isAuthenticated;
  }

  isAdmin(): boolean {
    // Retorna true se o usuário for um administrador, false caso contrário
    return false;
  }
}
