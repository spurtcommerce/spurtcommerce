import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activate-popup',
  templateUrl: './activate-popup.component.html',
  styleUrl: './activate-popup.component.scss'
})
export class ActivatePopupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }
  // modal close event
  close() {
    this.activeModal.close();
  }
  // proceed 
  proceed() {
    this.activeModal.close({message:'success'});
  }
}


