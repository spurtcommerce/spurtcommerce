import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { matchingPasswords, emailValidator } from '../../theme/utils/app-validators';
import { Router } from '@angular/router';
import { environment } from '../../../../../src/environments/environment';
import { CommonSandbox } from '../../../../../src/app/core/common/common.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { CommonService } from '../../../../../src/app/core/common/common.service';
import { ApprovalFlagService } from '../../shared/components/approvalServices/approval-flag.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  public loginForm: UntypedFormGroup;
  public submitted = false;
  showPassword: boolean = false;
  passwordFieldType: string = 'password';
  logoPath = environment.logo;
  userNameValidation: Boolean = false;
  passwordValidation: Boolean = false;
  languageArray: any = [];
  sellerData: any = {};
  getSettingsDetails: any = {};
  emailInvalidShow: boolean = false;
  constructor(public formBuilder: UntypedFormBuilder, public authSandbox: AuthSandbox,
    public router: Router, public commonSandbox: CommonSandbox, private translate: TranslateService, private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef, private CommonService: CommonService, private approvalServices: ApprovalFlagService,
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.initLoginForm();
    this.getLanguageList();
    this.titleService.setTitle("Sign In");

  }
  focusouterrorShow() {
    if (!['', null, undefined].includes(this.loginForm.value.emailId) && !/([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)/.test(this.loginForm.value.emailId)) {
      this.emailInvalidShow = true
    } else {
      this.emailInvalidShow = false;
    }
  }
  changeemail() {
    this.emailInvalidShow = false;
  }
  public initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required]
    });
  }

  public onLoginFormSubmit(values: Object): void {
    this.submitted = true
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }

    const params: any = {};
    params.username = this.loginForm.value.emailId;
    params.password = this.loginForm.value.password
    this.authSandbox.doLogin(this.loginForm.value);
    this.subscriptions.add(this.authSandbox.loginFailed$.subscribe(data => {

      if (data && data === true) {
        this.loginForm.reset();

      }

    }))
    this.subscriptions.add(this.authSandbox.loginFailed$.subscribe(val => {

      if (val?.error?.data == 1) {
        this.userNameValidation = true;
      }
      if (val?.error?.data == 2) {
        this.passwordValidation = true;
      }
    }))

    this.subscriptions.add(this.authSandbox.loginDetails$.subscribe(val => {
      if (val) {
        // this.sellerData = val.data;
        if (val && val?.length > 0 && Object.keys(this.getSettingsDetails).length > 0) {
          localStorage.setItem('dateTimeFormate', JSON.stringify(val.data?.personalizedSettings?.dateFormat != '' ? val.data?.personalizedSettings?.dateFormat : this.getSettingsDetails.dateFormat));
          localStorage.setItem('timeFormate', JSON.stringify(val.data?.personalizedSettings?.timeFormat != '' ? val.data?.personalizedSettings?.timeFormat : this.getSettingsDetails.timeFormat));

          if (val.data?.personalizedSettings?.defaultLanguage != 0) {
            let selectLang = this.languageArray?.find(vals => vals.languageId == val.data?.personalizedSettings?.defaultLanguage);
            localStorage.setItem('language', JSON.stringify(selectLang?.code));
            this.translate.setDefaultLang(selectLang.code);
            this.translate.use(selectLang.code);
          } else {
            if (this.languageArray.length > 0) {
              let selectLang = this.languageArray?.find(vals => vals.languageId == this.getSettingsDetails?.defaultLanguageId);
              localStorage.setItem('language', JSON.stringify(selectLang?.code));
              this.translate.setDefaultLang(selectLang.code);
              this.translate.use(selectLang.code);
            }

          }


        }
      }

    }))
  }

  getLanguageList() {
    const params = {
      limit: 0,
      offset: 0,
      keyword: '',
      count: 0
    }
    this.commonSandbox.languageList1(params);
    this.subscriptions.add(this.commonSandbox.languageList1$.subscribe(val => {
      if (val) {
        this.languageArray = val;
        // this.getSettings();
      }
    }));
  }



  getSettings() {
    this.commonSandbox.doSettings();
    this.subscriptions.add(this.commonSandbox.getSetting$.subscribe(val => {
      if (val) {
        val.forEach(element => {
          this.getSettingsDetails = element
        })
      }
    }))
  }




  validationMeaage() {
    this.userNameValidation = false;
    this.passwordValidation = false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }
  signup() {
    this.router.navigate(['/auth/register'])
  }
  forgot() {
    this.router.navigate(['/auth/recover-password'])
  }
  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });

  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
