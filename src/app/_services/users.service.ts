import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
  private _usersUrl = 'http://localhost:1337/api/users';
  private _cardsUrl = 'http://localhost:1337/api/cards';
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<any>(this._usersUrl);
  }
  getUser(id) {
    return this.http.get<any>(`${this._usersUrl}/${id}`);
  }
  getUserCollections(id) {
    return this.http.get<any>(`${this._usersUrl}/${id}/collections`);
  }
  addUserCollection(id, newUserCollection) {
    return this.http.post<any>(`${this._usersUrl}/${id}/collections/new`, newUserCollection);
  }
  updateUserCollection(id, userCollection) {
    return this.http.post<any>(`${this._usersUrl}/${id}/collections`, userCollection);
  }
  getUserCards(id) {
    return this.http.get<any>(`${this._cardsUrl}/${id}`);
  }
}
