import { Injectable } from '@angular/core';
import { Shortening } from './models/shortening-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  shortenings: Shortening[] = [];
  myconfirm: boolean;
  constructor() {
    this.shortenings = this.getShortenings();
  }

  saveShortening(shortening: Shortening): void {
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem('shortenings');

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem('shortenings', JSON.stringify(shortenings));
  }

  deleteShortening(id: string, name: string): boolean {
    this.myconfirm = confirm("Do you want to delete this shortening?");
    if(this.myconfirm == true){
      this.shortenings = this.getShortenings().filter(
        shortening => shortening.code !== id
      );}
      this.updateStorage(this.shortenings);
      return true;
    
  }
  getShorteningById(id: string): Shortening {
    return this.getShortenings().find(shortening => shortening.code === id);
  }

}
