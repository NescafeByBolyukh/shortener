import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shortening } from 'src/app/models/shortening-response.interface';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  short: Shortening;

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getShortening();
  }

  getShortening(): void {
    const shortId: string = this.route.snapshot.params['id'];
    const fetchedShortening = this.storageService.getShorteningById(shortId);
    if (fetchedShortening) {
      this.short = fetchedShortening;
    } else {
      this.redirect('shortener');
    }
  }

  redirect(url: string): void {
    this.router.navigate([`/${url}`]);
  }

}
