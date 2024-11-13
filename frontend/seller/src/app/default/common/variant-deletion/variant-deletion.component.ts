import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-variant-deletion',
  templateUrl: './variant-deletion.component.html',
  styleUrls: ['./variant-deletion.component.scss']
})
export class VariantDeletionComponent implements OnInit {
 
  constructor(public activeModal: NgbActiveModal) {

  }
  ngOnInit() {

  }
  close() {
    this.activeModal.close();
  }
  deleteContent() {
   this.activeModal.close(); 
  }
}
