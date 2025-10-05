import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../../core/service/url.service';
import { Url } from '../../core/model/url';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  urlForm: FormGroup;

  urlShortend: String = '';

  constructor(private urlService: UrlService){
    this.urlForm = new FormGroup({
      urlName: new FormControl('', Validators.required),
      originalUrl: new FormControl('', Validators.required),
      shortenedUrl: new FormControl('')
    });
  }

  ngOnInit(): void {
    
  }

  createShortUrl(): void {

    if(this.urlForm.valid){

      this.urlService.createUrlShort(this.urlForm.value).subscribe({
        
        next: (url: Url) => {
          console.log('URL encurtada criada com sucesso:', url);
          this.urlForm.reset();
          this.urlShortend = url.shortenedUrl;
        },
        error: (err) => console.error('Erro ao criar URL encurtada:', err)   
      })
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }




}
