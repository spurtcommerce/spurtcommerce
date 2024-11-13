/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Directive, ElementRef, OnInit, Input} from '@angular/core';
import { PermissionServices } from '../../../../../../theme/default/admin/shared/components/services/permission.services';

@Directive({
    selector: '[appHideIfUnauthorized]'
})
export class MyHideIfUnauthorizedDirective implements OnInit {
    @Input('appHideIfUnauthorized') permission: any; // Required permission passed in
    @Input('multipleHide') params;
    constructor(private el: ElementRef, private permissionServices: PermissionServices) {
    }

    ngOnInit() {
       
        if (this.permission != undefined || this.permission ! == '') {
           
            if (!this.permissionServices.hasPermission(this.permission)) {
                this.el.nativeElement.style.display = 'none';
            }
        }
        if (this.params && this.params.length > 0) {
            let array: any = [];
           
            array = this.params.map(each => {
                return this.permissionServices.hasPermission(each);
            });
            let exists = array.some(a => a == true);
            if (!exists) {
                this.el.nativeElement.style.display = 'none';
            }
        }
    }
}
