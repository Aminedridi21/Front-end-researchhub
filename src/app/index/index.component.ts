import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { AuthentificationService } from '../Services/authentification.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  searchPerformed = false;
  searchKeyword: string = '';
  searchResults: any[] = [];
  menu: String = 'admin';
  articles: any;
  receivedData: any;
  isLoggedIn = false;
  username = '';
  isAddingArticle: boolean = false; // Controls whether the form is visible or not

  article = {
    titre: '',
    doi: '',
    motsCles: '',
    pdf: null,
    domaine: ''
  };
  
  domains: any[] = [];

  articleForm = new FormGroup({
    titre: new FormControl(''),
    doi: new FormControl(''),
    motsCles: new FormControl(''),
    pdf: new FormControl(null),
    domaine: new FormControl('') // This will store the domain ID
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    public auth: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.receivedData = params;
      parseInt(this.receivedData);
      console.log(this.receivedData);
    });

    

    this.apiService.get_Article().subscribe((response: any) => {
      this.articles = response;
    });

    // Fetch domains from backend with Authorization header and debug log
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debug: check if token is present and valid
    this.http.get<any[]>('http://localhost:8090/api/domaines', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: data => {
        this.domains = data;
      },
      error: err => {
        console.error('Error fetching domains:', err);
      }
    });

    if (token) {
      this.isLoggedIn = true;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.username = user.firstName + ' ' + user.lastName;
    }
  }

  onSearch() {
  if (!this.searchKeyword.trim()) {
    this.searchResults = [];
    this.searchPerformed = false;
    return;
  }

  this.apiService.searchArticles(this.searchKeyword).subscribe(
    (results) => {
      this.searchResults = results;
      this.searchPerformed = true;
    },
    (error) => {
      console.error('Erreur lors de la recherche :', error);
      this.searchResults = [];
      this.searchPerformed = true;
    }
  );
}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Don't try to set the file value directly to the form control
      // Store it separately for form submission
      this.article.pdf = file;
    }
  }

  toggleAddArticle(): void {
    this.isAddingArticle = !this.isAddingArticle;
    if (!this.isAddingArticle) {
      // Reset form when closing
      this.articleForm.reset();
    }
  }

  addArticle(): void {
    const formValue = this.articleForm.value;
    const articleData = {
      titre: formValue.titre,
      doi: formValue.doi,
      motsCles: formValue.motsCles,
      domainId: formValue.domaine // This is now the ID
    };
    const formData = new FormData();
    formData.append('articleData', JSON.stringify(articleData));
    if (this.article.pdf) {
      formData.append('pdfDocument', this.article.pdf);
    }
    this.apiService.add_article(formData)
      .subscribe({
        next: response => {
          if (response.status === 201 || response.status === 200) {
            this.handleArticleSuccess();
          }
        },
        error: err => {
          if (err.status === 201) {
            this.handleArticleSuccess();
          } else {
            console.error('Error adding article:', err);
          }
        }
      });
  }

  handleArticleSuccess() {
    console.log("article ajouté avec succès");
    this.isAddingArticle = false;
    this.articleForm.reset();
    this.article = {
      titre: '',
      doi: '',
      motsCles: '',
      pdf: null,
      domaine: ''
    };
    this.refreshArticles();
  }

  refreshArticles(): void {
    this.apiService.get_Article().subscribe((response: any) => {
      this.articles = response;
    });
  }

  logout(): void {
    this.auth.log_out();
    this.isAddingArticle = false;
    this.isLoggedIn = false;
  }

  download(article: any): void {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const base64 = article.pdfDocument;
    if (!base64) {
      alert('Le PDF n\'est pas disponible');
      return;
    }

    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], {
      type: article.documentType || 'application/pdf',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = article.documentName || 'document.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  login(): void {
    this.router.navigate(['login']);
  }

  signup(): void {
    this.router.navigate(['signup']);
  }
  
  Signup(): void {
    this.router.navigate(['signup']);
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }
}

