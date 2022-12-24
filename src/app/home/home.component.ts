import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'CollectCard app';
  description = 'Это приложение для отслеживания своих коллекционных карт и обмена ими между пользователями';

  constructor() { }

  ngOnInit() {
  }

}
