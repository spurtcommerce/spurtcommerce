import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-success',
    templateUrl: './product-success.component.html',
    styleUrls: ['./product-success.component.scss']
})
export class ProductSuccessComponent implements OnInit {

    constructor(public modal: NgbActiveModal, private route: Router) { }

    ngOnInit() {
    }
    close() {
        this.route.navigate(['/catalog/manage-products/']);
        this.modal.close();
    }
}
