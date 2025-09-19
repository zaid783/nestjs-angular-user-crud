import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './confirmation-dialog';


@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  userForm!: FormGroup;   
  editMode = false;      
  selectedUserId: number | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUsers();

   
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getUsers() {
    this.http.get<any[]>('http://localhost:3000/api/user/all')
      .subscribe(data => {
        this.users = data;
      });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    if (this.editMode && this.selectedUserId) {
      
      this.http.put(`http://localhost:3000/api/user/${this.selectedUserId}`, this.userForm.value)
        .subscribe(() => {
          this.getUsers();
          this.cancelEdit();
        });
    } else {
    
      this.http.post('http://localhost:3000/api/user', this.userForm.value)
        .subscribe(() => {
          this.getUsers();
          this.userForm.reset();
        });
    }
  }

  startEdit(user: any) {
    this.editMode = true;
    this.selectedUserId = user.id;

   
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password || '' 
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedUserId = null;
    this.userForm.reset();
  }

  deleteUser(id: number) {
  const dialogRef = this.dialog.open(ConfirmDialog);

  dialogRef.afterClosed().subscribe(result => {
    if (result) { 
      this.http.delete(`http://localhost:3000/api/user/${id}`)
        .subscribe(() => this.getUsers());
    }
    else {
      console.log('User Can Not Deleted');
    }
  });
}
}