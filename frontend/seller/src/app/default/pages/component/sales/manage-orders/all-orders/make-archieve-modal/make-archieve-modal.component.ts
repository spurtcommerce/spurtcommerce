import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-make-archieve-modal',
  templateUrl: './make-archieve-modal.component.html',
  styleUrls: ['./make-archieve-modal.component.scss']
})
export class MakeArchieveModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }
  deleteContent(){
    this.activeModal.close('deleted');

  }

}
