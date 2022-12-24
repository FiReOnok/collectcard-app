import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../_services/collections.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CardsService } from '../_services/cards.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {
  collection = [];
  cardsInCollection = [];
  author = {};
  constructor(private _collectionsService: CollectionsService,
              private _cardsService: CardsService,
              private _usersService: UsersService,
              private _router: Router) { }

  ngOnInit() {
    this._collectionsService.getCollection(this._router.url)
      .subscribe(
        res => {
          this.collection = res;
          // console.log(this.collection[0].author_id);
          this._cardsService.getCardsInCollection(this._router.url)
          .subscribe(
            response => {
              this.cardsInCollection = response;
              // console.log(this.collection);
              // console.log(this.cardsInCollection);
              this._usersService.getUser(this.collection[0].author_id)
                .subscribe(
                  resp => this.author = resp[0].user,
                  err => err
                );
            },
            err => err
          );
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }
}
