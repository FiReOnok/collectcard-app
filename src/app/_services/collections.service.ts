import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollectionsService {
  private _collectionsUrl = 'http://localhost:1337/api/collections';
  private _collectionUrl = 'http://localhost:1337/api';
  constructor(private http: HttpClient) { }
  getCollections() {
    return this.http.get<any>(this._collectionsUrl);
  }
  getCollection(id) {
    return this.http.get<any>(`${this._collectionUrl}${id}`);
  }
  addCollection(collection) {
    return this.http.post<any>(this._collectionsUrl, collection);
  }
}
