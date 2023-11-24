import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'; //importação para gerar a tabela
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'; // componente para adicionar paginação na tabela (caso precise)
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule // importação do modulo para manipular o formulario <<
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

  formulario: FormGroup;
  listaDeRegistros: MatTableDataSource<any>; //gerenciar e enviar os dados para a tebela. Importante!!!
  
  //validação de formulário
  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      horas: ['', [Validators.required, Validators.max(60)]],
      dimensao: ['', Validators.required],
      tipoAtividade: ['', [Validators.required, Validators.maxLength(50)]],
    });

    this.listaDeRegistros = new MatTableDataSource<any>([]);  //lista que recebera os dados
  }

  // Aqui onde uso o "MatPaginatorModule" para usar com o metodo "ngAfterViewInit" para paginação na tabela.
  ngAfterViewInit() {
    this.listaDeRegistros.paginator = this.paginator;
    this.listaDeRegistros.sort = this.sort;
  }

  
  enviarFormulario() {
    if (this.formulario.valid) {
      const dadosFormulario = this.formulario.value;
      this.listaDeRegistros.data.push(dadosFormulario);
      this.listaDeRegistros._updateChangeSubscription(); // Atualiza os dados da tabela
      this.formulario.reset();
    }
  }
}
