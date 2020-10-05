/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, Inject, ViewEncapsulation, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-product-zoom',
    templateUrl: './product-zoom.component.html',
    styleUrls: ['./product-zoom.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductZoomComponent implements OnInit {
        // decorator
    @ViewChild('zoomImage') zoomImage;
    public count = 10;
    public maxWidth = 60;
    public data: any;
    constructor(public dialogRef: MatDialogRef<ProductZoomComponent>,
                @Inject(MAT_DIALOG_DATA)
                public image: any) {
    }

    ngOnInit() {
    }
            // close the window
    public close(): void {
        this.dialogRef.close();
    }
                // zoom the image
    public zoomIn() {
        if (this.count < 60) {
            this.maxWidth = this.maxWidth + this.count;
            this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
            this.count = this.count + 10;
        }
    }
            // zoom out the image
    public zoomOut() {
        if (this.count > 10) {
            this.count = this.count - 10;
            this.maxWidth = this.maxWidth - this.count;
            this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
        }
    }

}
