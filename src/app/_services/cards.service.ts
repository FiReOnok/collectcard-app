import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CardsService {
  private _cardsUrl = 'http://localhost:1337/api/cards';
  constructor(private http: HttpClient) { }
  getCards() {
    return this.http.get<any>(this._cardsUrl);
  }
  getRandomCard() {
    return this.http.get<any>(this._cardsUrl + '/get');
  }
  getCardsInCollection(collId) {
    return this.http.get<any>(this._cardsUrl + collId);
  }
  addCard(card) {
    return this.http.post<any>(this._cardsUrl, card);
  }
  increaseCard(id) {
    return this.http.get<any>(`${this._cardsUrl}/${id}/add`);
  }
}
