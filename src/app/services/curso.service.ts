import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:3001/cursos'; 

  constructor(private http: HttpClient) {}

  private cursos: any[] = [
    {
      id: 1,
      titulo: 'Curso de Angular',
      imagem: 'url_da_imagem_angular',
      descricao: 'Aprenda Angular de forma fácil e rápida.',
    },
  ];

  // Método para adicionar um curso
  adicionarCurso(curso: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/adicionar`, curso);
  }

  // Método para remover um curso
  removerCurso(cursoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remover/${cursoId}`);
  }

  // Método para editar um curso
  editarCurso(curso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${curso.id}`, curso);
  }

  // Método para inscrever o usuário em um curso
  inscreverUsuarioNoCurso(cursoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inscrever`, { cursoId });
  }

  getCursos(): any[] {
    return this.cursos;
  }

  getDetalhesCurso(cursoId: number): any {
    return this.cursos.find((curso) => curso.id === cursoId);
  }
}
