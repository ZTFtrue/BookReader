import { Component, OnInit, Inject, Directive } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, NgForm, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  searchControl = new FormGroup({
    searchKeyWord: new FormControl(null, [
      Validators.required,
      Validators.nullValidator, Validators.minLength(1), Validators.maxLength(2000)
    ]),
    searchAll: new FormControl(false, [])
  });
  book: any;
  location: any;
  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.book = data.book;
    this.location = data.location;
  }

  ngOnInit() {
  }
  onSubmit(f) {
    this.doSearch(f.searchKeyWord);
  }
  doSearch(q) {
    const res = Promise.all(
      this.book.spine.spineItems.map(item =>
        item.load(this.book.load.bind(this.book))
          .then(item.find.bind(item, q))
          .finally(item.unload.bind(item)))
    ).then(results => Promise.resolve([].concat.apply([], results)));
    res.then(r => {
      console.log(r);
    })
  }

  doChapterSearch(q) {
    const item = this.book.spine.get(this.location);
    const res = item.load(this.book.load.bind(this.book)).then(item.find.bind(item, q)).finally(item.unload.bind(item));
    res.then(r => {
      console.log(r)
    });
  }
}
