import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  mensaje = '';

  nombre = '';
  rol = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

  if (!this.email || !this.password) {
    this.mensaje = 'Debe llenar todos los campos';
    return;
  }

  this.http.post('http://localhost:3000/users/login', {

    email: this.email,
    password: this.password

  }).subscribe({

    next: (res: any) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('email', this.email);
      this.mensaje = 'Login correcto';
      setTimeout(() => {
        this.router.navigate(['/tickets']);
      }, 1000);
    },

    error: (err) => {
      console.log('ERROR BACKEND:', err);
      this.mensaje = 'Correo o contraseña incorrectos';
    }
  });
}

register() {

  if (!this.nombre || !this.email || !this.password || !this.rol) {
    this.mensaje = 'Debe llenar todos los campos';
    return;
  }

  this.http.post('http://localhost:3000/users/register', {

    nombre: this.nombre,
    email: this.email,
    password: this.password,
    rol: this.rol

  }).subscribe({

    next: (res) => {

      console.log(res);

      this.mensaje = 'Usuario registrado correctamente';

    },

    error: (err) => {

      console.log(err);

      this.mensaje = 'Error al registrar';

    }

  });

}
}