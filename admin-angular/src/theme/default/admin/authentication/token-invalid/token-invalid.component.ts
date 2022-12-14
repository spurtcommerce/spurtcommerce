import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSandbox } from '../../../../../core/admin/auth/auth.sandbox';

@Component({
  selector: 'app-token-invalid',
  templateUrl: './token-invalid.component.html',
  styleUrls: ['./token-invalid.component.scss']
})
export class TokenInvalidComponent implements OnInit {

  
  constructor(public router: Router, public sandbox: AuthSandbox) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 5000);
  }

}
