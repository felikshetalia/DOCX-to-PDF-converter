import { Component, OnInit, inject, DestroyRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  constructor(private http: HttpClient) {}
  title = 'frontend';
  //private _HttpClient = inject(HttpClient);
  private _RefDestroyer = inject(DestroyRef);
  fileInput : File | null = null;
  conversionMessage: string | null = null;
  downloadLink: string | null = null;

  private apiUrl = 'https://localhost:7207/api/conversion/convertdocxtopdf';


  onFileSelected(event: Event): void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.fileInput = input.files[0];
      this.conversionMessage = null;
      this.downloadLink = null;
    }
  }

  // ngOnInit(): void {
  //     const subscription = this._HttpClient
  //     .post<any>('https://localhost:7207/swagger/index.html', this.fileInput).subscribe()
  // }
  OnConvert(){
    if (!this.fileInput) {
      alert('Please select a DOCX file to convert.');
      return;
    }
    this.conversionMessage = 'Uploading your file and converting...';
    const formData = new FormData();
    formData.append('file', this.fileInput);
    this.http.post(this.apiUrl, formData, {responseType: 'blob'}).subscribe({
      next: (response: Blob)=>{
        this.conversionMessage = "Conversion successful!";
        const url = window.URL.createObjectURL(response);
        this.downloadLink = url;
      },
      error: (error : HttpErrorResponse) => {
        console.error('Error during conversion:', error);
        this.conversionMessage = 'Conversion failed. Please try again.';
      }
    })
  }
}
