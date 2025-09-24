import { Component } from '@angular/core';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsersComponent], 
  template: `
    <h1 style="text-align:center; margin:20px;">Angular CRUD OPT with NestJS API</h1>
    <app-users></app-users>
  `
})
export class App {}