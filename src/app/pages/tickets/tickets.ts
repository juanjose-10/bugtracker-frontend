import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets {

    mensaje = '';

  tituloTicket = '';
  descripcionTicket = '';
  prioridadTicket = '';
  tickets: any[] = [];
  usuarios: any[] = [];

  constructor(private http: HttpClient) {}

  cargarUsuarios() {
    const token = localStorage.getItem('token');

    this.http.get('http://localhost:3000/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res: any) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  crearTicket() {
    const token = localStorage.getItem('token');

    this.http.post('http://localhost:3000/tickets', {
      titulo: this.tituloTicket,
      descripcion: this.descripcionTicket,
      prioridad: this.prioridadTicket,
      estado: 'abierto',
      usuario: localStorage.getItem('email')
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        alert('Ticket creado');
        this.verTickets();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  verTickets() {
    this.http.get('http://localhost:3000/tickets').subscribe({
      next: (res: any) => {
        this.tickets = res;
      }
    });
  }

  cambiarEstado(id: number, estado: string) {
    this.http.patch(`http://localhost:3000/tickets/${id}`, {
      estado: estado
    }).subscribe({
      next: () => {
        this.verTickets();
      }
    });
  }
  
  logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
}