import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-expire',
  templateUrl: './token-expire.component.html',
  styleUrls: ['./token-expire.component.scss']
})
export class TokenExpireComponent implements OnInit {

  

  constructor(public router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 5000);
  }

}
