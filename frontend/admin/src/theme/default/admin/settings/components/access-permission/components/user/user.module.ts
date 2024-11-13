/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { UserAddComponent } from './add/add.component';
import { UserListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from '../../../../../../../../core/admin/settings/user/user-effect/user.effect';
import { UserService } from '../../../../../../../../core/admin/settings/user/user.service';
import { UserSandbox } from '../../../../../../../../core/admin/settings/user/user.sandbox';

// Routing Module
import { UserRoutingModule } from './user.routing';

// Shared Module
import { MaterialModule } from '../../../../../../../default/default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../../../admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../../shared/components';
import { PasswordShowModule } from '../../../../../../../../core/admin/shared/password-show.directives/passwordShow.module';

@NgModule({
    declarations: [UserAddComponent, UserListComponent],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UserRoutingModule,
        ComponentsModule,
        PasswordShowModule,
        EffectsModule.forFeature([UserEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [UserService, UserSandbox],
    bootstrap: []
})
export class UserModule { }
