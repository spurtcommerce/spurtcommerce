/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HTTPStatus } from '../../../../../../core/admin/providers/CommonInterceptor';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styles: [
    `
     #loader {
  bottom: 0;
  height: 175px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 175px;
}

#loader {
  bottom: 0;
  height: 175px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 175px;
}

#loader .dot {
  bottom: 0;
  height: 100%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 87.5px;
}

#loader .dot::before {
  border-radius: 100%;
  content: "";
  height: 87.5px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(0);
  width: 87.5px;
}

#loader .dot:nth-child(7n+1) {
  transform: rotate(45deg);
}

#loader .dot:nth-child(7n+1)::before {
  animation: 0.8s linear 0.1s normal none infinite running load;
  background: #00ff80 none repeat scroll 0 0;
}

#loader .dot:nth-child(7n+2) {
  transform: rotate(90deg);
}

#loader .dot:nth-child(7n+2)::before {
  animation: 0.8s linear 0.2s normal none infinite running load;
  background: #00ffea none repeat scroll 0 0;
}

#loader .dot:nth-child(7n+3) {
  transform: rotate(135deg);
}

#loader .dot:nth-child(7n+3)::before {
  animation: 0.8s linear 0.3s normal none infinite running load;
  background: #00aaff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n+4) {
  transform: rotate(180deg);
}

#loader .dot:nth-child(7n+4)::before {
  animation: 0.8s linear 0.4s normal none infinite running load;
  background: #0040ff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n+5) {
  transform: rotate(225deg);
}

#loader .dot:nth-child(7n+5)::before {
  animation: 0.8s linear 0.5s normal none infinite running load;
  background: #2a00ff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n+6) {
  transform: rotate(270deg);
}

#loader .dot:nth-child(7n+6)::before {
  animation: 0.8s linear 0.6s normal none infinite running load;
  background: #9500ff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n+7) {
  transform: rotate(315deg);
}

#loader .dot:nth-child(7n+7)::before {
  animation: 0.8s linear 0.7s normal none infinite running load;
  background: magenta none repeat scroll 0 0;
}

#loader .dot:nth-child(7n+8) {
  transform: rotate(360deg);
}

#loader .dot:nth-child(7n+8)::before {
  animation: 0.8s linear 0.8s normal none infinite running load;
  background: #ff0095 none repeat scroll 0 0;
}

#loader .loading {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  bottom: -40px;
  height: 20px;
  left: 0;
  position: absolute;
  right: 0;
  width: 180px;
}

@keyframes load {
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes load {
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.spinner-message {
  text-align: center;
}

.row {
  text-align: center;

}
    `
  ]

})
export class GlobalLoaderComponent implements OnInit, OnDestroy {
  @Input() isShow: any;
  private subscriptions: Array<Subscription> = [];
  public loader = false;


  constructor(private httpStatus: HTTPStatus) {
    this.getHttpResponse();
  }

  ngOnInit(): void {}

  getHttpResponse() {
    this.subscriptions.push(this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loader = status;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
