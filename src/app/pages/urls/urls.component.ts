import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { UrlService } from '../../core/service/url.service';
import { Url } from '../../core/model/url';

@Component({
  selector: 'app-urls',
  imports: [CommonModule],
  templateUrl: './urls.component.html',
  styleUrl: './urls.component.scss'
})
export class UrlsComponent implements OnInit {

  urlsList: Url[] = [];

  totalClicks: number = 0;
  mostClicked: number = 0;

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.loadUrls(); 
    this.totalClicksAndMostClicked();
    
  }

  totalClicksAndMostClicked(): void {
    this.urlService.totalClicksAndMostClickedUrl().subscribe({
      next: (response) => {
        this.totalClicks = response.totalClicks;
        this.mostClicked = response.mostClicked;
      },
      error: (err) => console.error('Erro ao obter total de cliques e URL mais clicada:', err)
    });
  }

  loadUrls(): void {
    this.urlService.getUrls().subscribe({
      next: (urls: Url[]) => {
        this.urlsList = urls;
      },
      error: (err) => console.error('Erro ao carregar URLs:', err)
    })
  }


}
