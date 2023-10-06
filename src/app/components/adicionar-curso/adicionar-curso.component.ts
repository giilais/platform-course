import { Router } from '@angular/router';
import { CursoService } from './../../services/curso.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-adicionar-curso',
  templateUrl: './adicionar-curso.component.html',
  styleUrls: ['./adicionar-curso.component.css'],
})
export class AdicionarCursoComponent {
  curso = {
    titulo: '',
    descricao: '',
    descricaoCompleta: '',
    topicos: '',
    imagem: '',
  };

  constructor(private cursoService: CursoService, private router: Router) {}

  adicionarCurso() {
    this.cursoService.adicionarCurso(this.curso).subscribe(
      (response) => {
        console.log('Curso adicionado com sucesso!', response);
        this.curso = {
          titulo: '',
          descricao: '',
          descricaoCompleta: '',
          topicos: '',
          imagem: '',
        };
      },
      (error) => {
        console.error('Erro ao adicionar curso:', error);
      }
    );
    alert("Alterações Salvas!");
    this.router.navigate(['/']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadImage(file);
  }

  uploadImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.curso.imagem = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
