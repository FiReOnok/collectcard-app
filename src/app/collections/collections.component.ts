import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../_services/collections.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collections = [];
  constructor(private _collectionsService: CollectionsService, private _router: Router) { }

  ngOnInit() {
    this._collectionsService.getCollections()
    .subscribe (
      res => this.collections = res,
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
