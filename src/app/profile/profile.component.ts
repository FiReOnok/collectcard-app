import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { CollectionsService } from '../_services/collections.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo = [];
  userCollection = [];
  userCards = [];
  userCardsSum = 0;
  collectionsCardsSum = 0;
  userCollectionFilled = 0;
  constructor(private _usersService: UsersService,
              private _collectionsService: CollectionsService) { }

  ngOnInit() {
    this._usersService.getUser(localStorage.getItem('user'))
      .subscribe(
        res => {
          // console.log(res);
          this.userInfo = res[0];
          // console.log(this.userInfo);
          this._usersService.getUserCollections(localStorage.getItem('user')) // Получаем коллекции пользователя
            .subscribe(
              resp => {
                this.userCollection = resp;
                console.log(this.userCollection);
                this.userCardsSum = resp.length;
                for (let i = 0; i < this.userCollection.length; i++) { // Получаем карты имеющиеся у пользователя
                  const element = this.userCollection[i];
                  const cardId = element.cards_id;
                  this._usersService.getUserCards(cardId)
                    .subscribe(
                      respon => {
                        this.userCards.push(respon[0]);
                      },
                      err => err
                    );
                }
                console.log(this.userCards);
                this._collectionsService.getCollections() // Получаем общее количество карт в коллекциях
                  .subscribe(
                    respo => {
                      for (let i = 0; i < respo.length; i++) {
                        const element = respo[i];
                        // console.log(respo[i]);
                        this.collectionsCardsSum = this.collectionsCardsSum + respo[i].cardsCount;
                      }
                      // this.userCollectionFilled = (this.collectionsCardsSum / this.userCardsSum) * 10;
                      this.userCollectionFilled = this.userCardsSum / this.collectionsCardsSum * 1000; // todo
                      console.log(this.collectionsCardsSum);
                      console.log(this.userCardsSum);
                    },
                    err => err
                  );
              },
              err => err
            );
        },
        err => err
      );
  }

}
