import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-coupon',
    templateUrl: './add-coupon.component.html',
    styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

    constructor(public modal: NgbActiveModal, private route: Router) { }

    ngOnInit() {
    }
    close() {
        this.modal.close();
    }
}
