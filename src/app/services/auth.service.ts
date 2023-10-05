import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  private isAuthenticated: boolean = false;

  getToken() {
    return localStorage.getItem('token');
  }

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

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.userId;
    }
    return null;
  }
}
