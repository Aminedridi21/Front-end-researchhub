import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  menu: String = 'admin';
  articles: any;
  receivedData: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.receivedData = params;
      parseInt(this.receivedData);
      console.log(this.receivedData);
    });

    this.apiService.get_Article().subscribe((response) => {
      this.articles = response;
    });
  }
  download(article: any) {
    const base64 = article.pdfDocument; // base64 string
    const binaryString = atob(base64); // decode base64 to binary string

    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i); // convert each char to byte
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

  login() {
    this.router.navigate(['login']);
  }
  Signup() {
    this.router.navigate(['signup']);
  }
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
