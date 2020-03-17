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
  resItems: any = null;
  searching = false;
  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.book = data.book;
    this.location = data.location;
  }

  ngOnInit() {
  }
  onSubmit(f: any) {
    if (!f.searchKeyWord) {
      return;
    }
    this.searching = true;
    if (f.searchAll) {
      this.doSearch(f.searchKeyWord);
    } else {
      this.doChapterSearch(f.searchKeyWord);
    }
  }
  doSearch(q: string) {
    this.resItems = null;
    Promise.all(
      this.book.spine.spineItems.map(item =>
        item.load(this.book.load.bind(this.book))
          .then(item.find.bind(item, q))
          .finally(item.unload.bind(item))
      )
    ).then(results => {
      const rea = [].concat.apply([], results);
      this.resItems = rea;
      this.searching = false;
    });
  }

  doChapterSearch(q: string) {
    this.resItems = null;
    const item = this.book.spine.get(this.location);
    const res = item.load(this.book.load.bind(this.book)).then(item.find.bind(item, q)).finally(item.unload.bind(item));
    res.then(r => {
      this.resItems = r;
      this.searching = false;
    });
  }
  /*
  *0:
cfi: "epubcfi(/6/10[id4]!/4/8,/1:62,/1:63)"
excerpt: "...↵我像傻瓜一样混进首吠破的似乎是纯种老北京人开的冷面馆子..."

  */
  selectNavigation($event, item: any) {
    this.dialogRef.close(item.cfi);
  }
}
