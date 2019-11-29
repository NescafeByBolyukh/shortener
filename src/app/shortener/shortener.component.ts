import { Component, OnInit } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  url: string = '';
  name: string = '';
  shortenings: Shortening[] = [];

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.updateShortenings();
  }


  onSubmit(): void {
    if (!this.url || !this.name) {
      return;
    }

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      const shortening: Shortening = {
        ...res.result,
        name: this.name
      };
      this.storageService.saveShortening(shortening);
      this.updateShortenings();
      this.name = '';
      this.url = '';
    }
    );
  }

  updateShortenings(): void {
    this.shortenings = this.storageService.getShortenings();
  }
  onDeleteShortening(id: string, name: string): void {
    this.storageService.deleteShortening(id, name);
    this.updateShortenings();
  }
}
