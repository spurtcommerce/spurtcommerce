import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-delivery',
    templateUrl: './add-delivery.component.html',
    styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {

    constructor(public modal: NgbActiveModal, private route: Router) { }

    ngOnInit() {
    }
    close() {
        this.modal.close();
    }
}
