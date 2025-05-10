import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  articleId: string = '';
  pdfFile: File | null = null;
  domains: any[] = [];
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ApiService,
    private http: HttpClient
  ) {
    this.articleForm = new FormGroup({
      titre: new FormControl(''),
      doi: new FormControl(''),
      motsCles: new FormControl(''),
      domaine: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    const token = localStorage.getItem('token');
    if (token) {
      this.loadArticle();
      this.loadDomains(token);
    } else {
      console.warn('No token found, delaying domain load...');
      // optionnel : rediriger ou attendre via setTimeout si nécessaire
    }
    
  }

  loadArticle() {
    this.articleService.getArticleById(this.articleId).subscribe(
      (data) => {
        this.articleForm.patchValue({
          titre: data.titre,
          doi: data.doi,
          motsCles: data.motsCles,
          domaine: data.domain.id
        });
        this.loading = false;
      },
      (error) => {
        this.errorMsg = "Impossible de charger l'article.";
        this.loading = false;
      }
    );
  }

  loadDomains(token: string) {
    
    console.log('Token:', token); // Vérifie que le token est bien affiché
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.get<any[]>('http://localhost:8090/api/domaines', { headers })
      .subscribe({
        next: data => {
          this.domains = data;
        },
        error: err => {
          console.error('Error fetching domains:', err);
        }
      });
  }
  
  

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pdfFile = file;
    }
  }

  updateArticle() {
    const formValue = this.articleForm.value;
    const updateData = {
      titre: formValue.titre,
      doi: formValue.doi,
      motsCles: formValue.motsCles,
      domainId: formValue.domaine
    };
    const formData = new FormData();
    formData.append('UpdateArticleData', JSON.stringify(updateData));
    if (this.pdfFile) {
      formData.append('pdfDocument', this.pdfFile);
    }
    this.articleService.updateArticle(this.articleId, formData).subscribe({
      next: () => {
        this.router.navigate(['/article', this.articleId]);
      },
      error: err => {
        this.errorMsg = "Erreur lors de la modification de l'article.";
        console.error(err);
      }
    });
  }
}
