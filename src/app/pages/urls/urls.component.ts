import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { UrlService } from '../../core/service/url.service';
import { Url } from '../../core/model/url';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../core/service/snackBar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-urls',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './urls.component.html',
  styleUrl: './urls.component.scss'
})
export class UrlsComponent implements OnInit {

  urlsList: Url[] = [];

  totalClicks: number = 0;
  mostClicked: number = 0;

  selectedUrlDelete: any = null;
  selectedUrlUpdate: any = null;

  showDeleteModal: boolean = false;

  searchNameUrl: string = '';

  constructor(
    private urlService: UrlService,
    private snackBarService: SnackbarService
  ) { }

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

  deleteUrl(): void {

    if(!this.selectedUrlDelete) return;

    this.urlService.deleteUrlShort(this.selectedUrlDelete.id).subscribe({
      next: () => {
        console.log('URL deletada com sucesso')
        this.snackBarService.onSnackBar('URL deletada com sucesso!');
        this.closeDeleteModal();
        this.loadUrls();
      },
      error: (err) => console.error('Erro ao deletar URL:', err),
    });
  }

  filterUrls(): Url[] {

    if (!this.searchNameUrl) {
      return this.urlsList;
    }

    const searchTerm = this.searchNameUrl.toLowerCase();

    return this.urlsList.filter(url =>
      url.urlName.toLowerCase().includes(searchTerm) ||
      url.originalUrl.toLowerCase().includes(searchTerm)
    );
  }

  openEditModal(url: Url): void {
    this.selectedUrlUpdate = {...url};
  }

  closeEditModal(): void {
    this.selectedUrlUpdate = null;
  }

  updateUrl(): void {
    if (!this.selectedUrlUpdate) return;

    const body = {
      urlName: this.selectedUrlUpdate.urlName,
      originalUrl: this.selectedUrlUpdate.originalUrl
    };

    this.urlService.putUrlShort(this.selectedUrlUpdate.id, body).subscribe({
      next: (updatedUrl) => {
        const index = this.urlsList.findIndex(url => url.id === updatedUrl.id);
        if (index !== -1) {
          this.urlsList[index] = updatedUrl;
        }
        this.closeEditModal();
        this.showSnackBar('URL atualizada com sucesso!');
        this.loadUrls();
      },
      error: (err) => console.error('Erro ao atualizar URL:', err)
    });
  }

  showSnackBar(message: string){
    this.snackBarService.onSnackBar(message);
  }

  openDeleteModal(url: Url): void {
    this.selectedUrlDelete = url;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.selectedUrlDelete = null;
    this.showDeleteModal = false;
  }


}
