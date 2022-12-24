import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { CollectionsService } from '../_services/collections.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-collection-add',
  templateUrl: './collection-add.component.html',
  styleUrls: ['./collection-add.component.css']
})
export class CollectionAddComponent implements OnInit {
  collectionData = {};
  selectedFile: File = null;
  imgName = {};
  public createCollectionForm: FormGroup;
  constructor(private _router: Router,
              private _collectionsService: CollectionsService,
              private _http: HttpClient) {
    this.createCollectionForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });
   }
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
   getErrorMessage() {
    return this.title.hasError('required') ? 'Необходимо заполнить это поле' :
        this.description.hasError('required') ? 'Необходимо заполнить это поле' :
            '';
  }
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
  ngOnInit() {
  }
  public createCollection() {
    this.collectionData = {title: this.title.value,
                          description: this.description.value,
                          cardsCount: 0,
                          author_id: localStorage.getItem('user'),
                          image_url: this.imgName};
    if (this.title.value == null || this.description.value == null) {
      console.log('Форма заполнена некорректно!');
    } else {
      this._collectionsService.addCollection(this.collectionData)
        .subscribe(
          res => {
            // console.log(res);
            this._router.navigate([`/collections/${res.insertId}`]);
          },
          err => console.log(err)
        );
    }
  }
}
