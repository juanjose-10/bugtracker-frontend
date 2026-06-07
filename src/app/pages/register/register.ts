import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  nombre = '';
  email = '';
  rol = '';
  password = '';
  mensaje = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {

    if (!this.nombre || !this.email || !this.password) {
      this.mensaje = 'Debe llenar todos los campos';
      return;
    }

    this.http.post('http://localhost:3000/users/register', {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: 'usuario'
    }).subscribe({

      next: () => {
        this.mensaje = 'Usuario registrado correctamente';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: () => {
        this.mensaje = 'Error al registrar';
      }
    });
  }
}