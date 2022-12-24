import { Component, OnInit } from '@angular/core';
import { CardsService } from '../_services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards = [];
  constructor(private _cardsService: CardsService) { }

  ngOnInit() {
    this._cardsService.getCards()
      .subscribe (
        res => this.cards = res,
        err => console.log(err)
      );
  }
}
