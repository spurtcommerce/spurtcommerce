import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-updatebulkinfo',
  templateUrl: './updatebulkinfo.component.html',
  styleUrls: ['./updatebulkinfo.component.scss']
})
export class UpdatebulkinfoComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public dismiss() {
    this.activeModal.close();
  }

}
