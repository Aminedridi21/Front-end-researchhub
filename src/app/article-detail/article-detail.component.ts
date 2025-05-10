import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
interface Article {
  id: number;
  doi: string;
  titre: string;
  motsCles: string;
  pdfDocument: string;
  documentName: string;
  documentType: string;
  domain: {
    id: number;
    nomDomaine: string;
  };
}
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
   
  

  article: Article | null = null;
  articleId: string = '';
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id') || '';
      this.loadArticle();
    });
  }

  loadArticle() {
    this.loading = true;
    this.articleService.getArticleById(this.articleId).subscribe(
      (data) => {
        this.article = data;
        this.loading = false;
        console.log('Article reçu:', data);
      },
      (error) => {
        this.errorMsg = "Impossible de charger l'article.";
        this.loading = false;
        console.error('Erreur lors du chargement de l\'article:', error);
      }
    );
  }

  editArticle() {
    this.router.navigate(['/edit-article', this.articleId]);
  }

  deleteArticle() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(this.articleId).subscribe(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }

  downloadPdf() {
    if (this.article) {
      const link = document.createElement('a');
      link.href = `data:${this.article.documentType};base64,${this.article.pdfDocument}`;
      link.download = this.article.documentName;
      link.click();
    }
  }

}
