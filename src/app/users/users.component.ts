import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var bootstrap: any; // important pour utiliser la modale Bootstrap

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userModal') userModalRef!: ElementRef; // référence à la modale
  modalInstance: any;

  users: any[] = [];
  recherche: boolean = false;
  selectedUser: any = null;
  isEditMode: boolean = false;
  userForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.refreshUsers();
  }

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.userModalRef.nativeElement);
  }

  initForm() {
    this.userForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      employmentDate: new FormControl('', Validators.required),
      originalEstablishment: new FormControl('', Validators.required),
      lastDiploma: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }

  refreshUsers() {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.resetForm();
    this.modalInstance.show();
  }

  openEditModal(user: any) {
    this.isEditMode = true;
    this.userForm.patchValue(user);
    this.modalInstance.show();
  }

  onSubmit() {
    const userData = this.userForm.value;
    if (this.isEditMode && userData.id !== null) {
      this.apiService.updateUser(userData.id, userData).subscribe(() => {
        this.refreshUsers();
        this.modalInstance.hide();
      });
    } else {
      this.apiService.addUser(userData).subscribe(() => {
        this.refreshUsers();
        this.modalInstance.hide();
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.apiService.deleteUser(id).subscribe(() => {
        this.refreshUsers();
      });
    }
  }

  resetForm() {
    this.userForm.reset({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      employmentDate: '',
      originalEstablishment: '',
      lastDiploma: '',
      grade: '',
      role: ''
    });
  }
}
