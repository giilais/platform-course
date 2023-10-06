import { Component } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cursos: any[];
  isAdmin: boolean = false;
  
  constructor(
    private cursoService: CursoService,
    private authService: AuthService
  ) {
    this.cursos = [];
  }

  ngOnInit() {
    this.cursoService.getCursos().subscribe((data: any[]) => {
      this.cursos = data;
    });

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin) {
      this.isAdmin = true;
    }
  }

  getIdDoUsuario() {
    return this.authService.getUserIdFromToken();
  }

}
