import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-data',
  templateUrl: './review-data.component.html',
  styleUrls: ['./review-data.component.scss']
})
export class ReviewDataComponent implements OnInit {
  fileName: any ='';
  data: any;

  constructor() { }

  ngOnInit(): void {
    const storedValue = sessionStorage.getItem('myKey');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue); 
      this.fileName = parsedValue.name;
      this.data = parsedValue.data;
    }
    console.log(this.data)
  }

}
