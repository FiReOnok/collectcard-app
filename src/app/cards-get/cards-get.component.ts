import { Component, OnInit } from '@angular/core';
import { CardsService } from '../_services/cards.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-cards-get',
  templateUrl: './cards-get.component.html',
  styleUrls: ['./cards-get.component.css']
})
export class CardsGetComponent implements OnInit {
  card = {
    collection_id: 0,
    name: '???',
    description: '???',
    count: 0,
    rareness: '???',
    image_url: 'placeholder.png'
  };
  newUserCollection = {};
  userCollection = [];
  userCards = [];
  cardCount = 1;
  constructor(private _cardsService: CardsService,
    private _usersService: UsersService) { }

  ngOnInit() {
  }
  getNewCard() {
    console.log('initialized');
    let coincidence = false;
    this._cardsService.getRandomCard()
      .subscribe(
        res => {
          console.log(res[0]);
          this._cardsService.increaseCard(res[0].id)
            .subscribe(
              resp => console.log('increased'),
              err2 => console.log(err2)
            );
          this.card.collection_id = res[0].collection_id;
          this.card.name = res[0].name;
          this.card.description = res[0].description;
          this.card.count = res[0].count;
          this.card.rareness = res[0].rareness;
          this.card.image_url = res[0].image_url;
          this._usersService.getUserCollections(localStorage.getItem('user'))
            .subscribe(
              respo => {
                this.userCollection = respo;
                // console.log(this.userCollection);
                for (let i = 0; i < this.userCollection.length; i++) { // Получаем карты имеющиеся у пользователя
                  const element = this.userCollection[i];
                  const cardId = element.cards_id;
                  // console.log(cardId);
                  if (cardId === res[0].id) { // Находим совпадение с выданной картой, если она есть в коллекции
                    console.log('Карта уже была в коллекции');
                    this.cardCount = element.count + 1;
                    coincidence = true;
                  }
                  this._usersService.getUserCards(cardId)
                    .subscribe(
                      respon => {
                        this.userCards.push(respon[0]);
                      },
                      err => err
                    );
                }
                this.newUserCollection = {
                  user_id: localStorage.getItem('user'),
                  collection_id: res[0].collection_id,
                  cards_id: res[0].id,
                  count: this.cardCount
                };
                // console.log(this.userCards);
                if (coincidence) { // Если карта уже есть, просто увеличиваем их количество в коллекции пользователя
                  // console.log(this.newUserCollection);
                  this._usersService.updateUserCollection(localStorage.getItem('user'), this.newUserCollection)
                    .subscribe(
                      respons => console.log('Обновлена старая коллекция'),
                      err4 => console.log(err4)
                    );
                } else { // Если карты ещё небыло у пользователя, добавляем новую коллекцию данному пользователю
                  // console.log(this.newUserCollection);
                  this._usersService.addUserCollection(localStorage.getItem('user'), this.newUserCollection)
                    .subscribe(
                      respons => console.log('Добавлена новая коллекция'),
                      err5 => console.log(err5)
                    );
                }
              },
              err3 => console.log(err3)
            );
        },
        err1 => console.log(err1)
      );
  }
}
