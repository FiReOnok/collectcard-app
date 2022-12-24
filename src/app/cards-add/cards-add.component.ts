import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { CollectionsService } from '../_services/collections.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardsService } from '../_services/cards.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards-add',
  templateUrl: './cards-add.component.html',
  styleUrls: ['./cards-add.component.css']
})
export class CardsAddComponent implements OnInit {
  cardData = {};
  selectedFile: File = null;
  imgName = {};
  collections = [];
  public createCardForm: FormGroup;
  constructor(private _router: Router,
              private _collectionsService: CollectionsService,
              private _cardsService: CardsService,
              private _http: HttpClient) {
    this.createCardForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      rareness: new FormControl(),
      collection: new FormControl()
    });
  }
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  rareness = new FormControl('', [Validators.required]);
  collection = new FormControl('', [Validators.required]);
  onFileChanged(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('card', this.selectedFile, this.selectedFile.name);
    this._http.post('http://localhost:1337/api/uploadImg', uploadData)
      .subscribe(
        res => {
          console.log(res);
          this.imgName = res;
        }
      );
  }
  getErrorMessage() {
    return this.name.hasError('required') ? 'Необходимо заполнить это поле' :
      this.description.hasError('required') ? 'Необходимо заполнить это поле' :
        this.rareness.hasError('required') ? 'Необходимо заполнить это поле' :
          this.collection.hasError('required') ? 'Необходимо заполнить это поле' :
            '';
  }
  ngOnInit() {
  }
  public createCard() {
    this.cardData = {
      collection_id: this.collection.value,
      name: this.name.value,
      description: this.description.value,
      count: 0,
      rareness: this.rareness.value,
      image_url: this.imgName
    };
    if (this.name.value == null || this.description.value == null || this.description.value == null || this.description.value == null) {
      console.log('Форма заполнена некорректно!');
    } else {
      this._cardsService.addCard(this.cardData)
        .subscribe(
          res => {
            console.log(res);
            this._router.navigate([`/cards`]);
          },
          err => console.log(err)
        );
    }
  }
}
