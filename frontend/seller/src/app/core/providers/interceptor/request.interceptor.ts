import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../src/environments/environment';
// import { json } from 'stream/consumers';
@Injectable()
export class HTTPStatus {
    public requestInFlight$: BehaviorSubject<boolean>;

    constructor() {
        this.requestInFlight$ = new BehaviorSubject(false);
    }

    setHttpStatus(inFlight: boolean) {
        this.requestInFlight$.next(inFlight);
    }

    getHttpStatus(): Observable<boolean> {
        return this.requestInFlight$.asObservable();
    }
}
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    baseUrl = environment.baseUrl;
    protected userTokenDetail: any = {};
    constructor(private router: Router, private toastr: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        this.userTokenDetail = localStorage.getItem('vendorToken') ? (localStorage.getItem('vendorToken')) : false;
        if (this.userTokenDetail) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.userTokenDetail}`, 'key': '8097571064818418'
                },
            });
        }
        return next.handle(req).pipe(
            map((responsedata: any) => {
                if (responsedata instanceof HttpResponse) {
                    const response = responsedata.body;


                    if (req.url == `${this.baseUrl}/settings?defaultWebsite=1`) {
                        localStorage.setItem('dateFormat', response.data[0].dateFormat);
                        localStorage.setItem('itemsPerPage', response.data[0].itemsPerPage);

                    }
                    if (response && response.message !== '' && req.method !== 'GET' && req.method !== 'POST' && !req.url.includes('vendor-product-specification/attribute-slug/product') && !req.url.includes('vendor-product-specification/product'.toLowerCase()) && !req.url.includes('vendor/forgot-password-link'.toLowerCase()) && response.message !== 'Successfully update pending status..!' && response.message !== 'Successfully Updated Order..!') {
                        this.showNotificationSuccess(response.message);
                    }

                }
                return responsedata;
            }),
            catchError(response => {
                const validMessage: any = {
                    loginEmail: "Invalid Username",
                    loginPassword: "Wrong Password",
                    signupMail: "Invalid email",
                    signupOTP: "Please Enter a Valid OTP",
                    verificationMail: "Invalid email",
                    verificationpassword: "Invalid Password",
                    forgotpasswordMail: "Invalid email"
                }
                switch (response.status) {
                    case 400:

                        if ((req.url == `${this.baseUrl}/vendor/login`) && response.error.message === validMessage.loginEmail ||
                            (req.url == `${this.baseUrl}/vendor/reset-password`) && response.error.message ||
                            (req.url == `${this.baseUrl}/vendor/mail-otp`) && response.error.message ||
                            (req.url == `${this.baseUrl}/seller`) && response.error.message ||
                            (req.url == `${this.baseUrl}/vendor/forgot-password-link`) && response.error.message === validMessage.forgotpasswordMail ||
                            (req.url == `${this.baseUrl}/vendor/verify`) && response.error.message ||
                            (req.url == `${this.baseUrl}/vendor/email-verify`) && response.error.message || (req.url == `${this.baseUrl}/vendor-product-specification/product`) || (req.url == `${this.baseUrl}/vendor/forgot-password-link`)) {
                        }
                        else {
                            this.handleBadRequest(response.error);
                        }
                        break;

                    case 401:
                        this.handleUnauthorized(response);
                        break;
                    case 502:
                        this.handleServerError502();
                        break;
                    case 422:
                        if ((req.url == `${this.baseUrl}/vendor/verify`) && response.error.message) {
                        }
                        else {
                            this.handleUnProcessableEntry(response.error);
                        }

                        break;
                    case 403:
                        this.handleForbidden();
                        break;

                    case 404:
                        this.handleNotFound(response);
                        break;

                    case 500:
                        if (req.url.includes('vendor-product-specification/product'.toLowerCase())) { }
                        else {

                            this.handleServerError();
                        }
                        break;
                    case 413:
                        this.handleErrorMessages(response.error.meta);
                        break;
                    case 409:
                        this.handleErrorMessages(response.error.meta);
                        break;
                    case 0:
                        this.handleServerError502();
                        break;
                    default:
                        break;
                }
                return throwError(response);
            })
        );
    }

    public handleServerError502() {
        this.router.navigate(['server-error']);
    }
    public handleDoc(response) { }
    public handleUnProcessableEntry(error) {
        if (error && error.data && error.data.message) {
            this.showNotificationErrors(Array.isArray(error.data.message) ? error.data.message[0] : error.data.message);
        }
    }
    /**
     * Shows notification errors when server response status is 401
     *
     * @params error
     */
    private handleBadRequest(responseBody: any): void {
        this.showNotificationError('', responseBody.message);
    }

    /**
     * Shows notification errors when server response status is 401 and redirects user to login page
     *
     * @params responseBody
     */
    private handleUnauthorized(responseBody: any): void {
        this.showNotificationError('', 'unauthorized');

    }

    /**
     * Shows notification errors when server response status is 403
     */
    private handleForbidden(): void {
        this.showNotificationError('Unauthorized', 'Error');
        localStorage.removeItem('vendorUserDetails');
        localStorage.removeItem('vendorUser');
        localStorage.removeItem('vendor-settings');
        localStorage.removeItem('vendorToken');
        this.router.navigate(['/auth/login']);
    }

    /**
     * Shows notification errors when server response status is 404
     *
     * @params responseBody
     */
    private handleNotFound(responseBody: any): void {
        const message = 'Page Not Found',
            title = '404';

    }

    /**
     * Shows notification errors when server response status is 500
     */
    private handleServerError(): void {
        const message = 'Internal Server Error',
            title = '500';

        this.showNotificationError(title, message);
    }

    /**
     * Parses server response and shows notification errors with translated messages
     *
     * @params response
     */
    private handleErrorMessages(response: any): void {
        if (!response) {
            return;
        }
        this.showNotificationError('Error', response.message);
    }

    /**
     * Returns relative url from the absolute path
     *
     * @params responseBody
     */
    private getRelativeUrl(url: string): string {
        return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '');
    }

    /**
     * Shows error notification with given title and message
     *
     * @params title
     * @params message
     */
    private showNotificationError(title: string, message: string): void {
        this.toastr.error(message, title);
    }
    private showNotificationErrors(message: string): void {
        this.toastr.error(message);
    }

    /**
     * Shows success notification with given title and message
     *
     * @params title
     * @params message
     */
    private showNotificationSuccess(message: string): void {
        if (message === 'You successfully changed the notification read status') {
            return;
        }
        this.toastr.success(message);
    }
}
