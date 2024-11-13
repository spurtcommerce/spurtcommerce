import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-validation-modal',
  templateUrl: './validation-modal.component.html',
  styleUrls: ['./validation-modal.component.scss']
})
export class ValidationModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }


  @Input() text:any
  

  ngOnInit(): void {
  }


  public dismiss() {
    this.activeModal.close();
  }
}
