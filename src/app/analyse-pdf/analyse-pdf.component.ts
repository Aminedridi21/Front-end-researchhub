import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-analyse-pdf',
  templateUrl: './analyse-pdf.component.html',
  styleUrls: ['./analyse-pdf.component.css'],
})
export class AnalysePdfComponent {
  selectedFile: File | null = null;
  response: any = null;
  error: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http
      .post<any>('http://localhost:8082/analyzePDF/', formData)
      .subscribe({
        next: (res) => {
          this.response = res;
          this.error = '';
        },
        error: (err) => {
          console.error(err);
          this.error = "Erreur lors de l'analyse du fichier.";
        },
      });
  }
}
