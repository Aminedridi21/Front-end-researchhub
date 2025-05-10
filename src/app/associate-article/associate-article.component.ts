import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associate-article',
  templateUrl: './associate-article.component.html',
  styleUrls: ['./associate-article.component.css']
})
export class AssociateArticleComponent implements OnInit {
  associateForm!: FormGroup;
  users: any[] = [];
  articles: any = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.associateForm = new FormGroup({
      date: new FormControl('', Validators.required),
      id_user: new FormControl('', Validators.required),
      id_article: new FormControl('', Validators.required)
    });

    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });

    this.apiService.get_Article().subscribe(data => {
      this.articles = data;
    });
  }

  onSubmit() {
    if (this.associateForm.valid) {
      this.apiService.addContribution(this.associateForm.value).subscribe(() => {
        alert('Contribution ajoutée avec succès');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
