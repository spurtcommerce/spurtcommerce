import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-delete-popup',
    templateUrl: './delete-popup.component.html',
    styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

    constructor(public modal: NgbActiveModal, private route: Router) { }

    ngOnInit() {
    }
    clear() {
        this.modal.close();
    }
    deleteData() {
        this.modal.close("deleted");
    }
}
