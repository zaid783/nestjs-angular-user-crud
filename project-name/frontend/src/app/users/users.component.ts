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
// import { min } from 'rxjs';

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
  selectedFiles: File[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUsers();
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email  ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // uploadFiles: ['', Validators.required]

    });
  }

  getUsers() {
    this.http.get<any[]>('/user/all')
      .subscribe(data => {
        this.users = data;
      });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    if (this.editMode && this.selectedUserId) {
      this.http.put(`/user/${this.selectedUserId}`, this.userForm.value)
        .subscribe(() => {
          this.getUsers();
          this.cancelEdit();
        });
    } 
    else {
      this.http.post('/user', this.userForm.value)
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
      password: '' 
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedUserId = null;
    this.userForm.reset();
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`/user/${id}`)
          .subscribe(() => {
            this.getUsers();
          });
      }
    });
  }

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files) as File[];
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  uploadFiles(userId: number) {
    if (this.selectedFiles.length === 0) return;

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    this.http.post(`/user/upload/${userId}`, formData)
      .subscribe(() => {
        this.selectedFiles = [];
        this.getUsers();
      });
  }
}