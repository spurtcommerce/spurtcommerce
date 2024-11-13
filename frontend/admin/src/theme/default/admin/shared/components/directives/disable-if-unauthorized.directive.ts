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
    selector: '[appDisableIfUnauthorized]'
})
export class MyDisableIfUnauthorizedDirective implements OnInit {
    @Input('appDisableIfUnauthorized') permission: string; // Required permission passed in
    constructor(private el: ElementRef, private permissionServices: PermissionServices) {
    }

    ngOnInit() {
        if (!this.permissionServices.hasPermission(this.permission)) {
            this.el.nativeElement.disabled = true;
        }
    }
}
