/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductSandbox } from '../../../../../../../../core/admin/catalog/product/product.sandbox';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit, OnDestroy {

  public answer = [];
  public questionList: any;
  public questionId: any;
  private subscriptions: Array<Subscription> = [];
  public error = false;
  public defaultAnswer: any;
  public answerId: any;
  public textValue: any;


  constructor(public activeModal: NgbActiveModal,
    public sandbox: ProductSandbox) {
  }

  ngOnInit() {
    if (this.questionList) {
      this.questionId = this.questionList.questionId;
      this.getAnswerList();
      this.subscribe();
    }

  }
  close() {
    this.activeModal.close('success');
  }

  getAnswerList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = '';
    params.questionId = this.questionId;
    this.sandbox.getAnswerList(params);
  }

  submit() {
    if (this.textValue && this.textValue.charAt(0) !== ' ') {
      this.error = false;
      const params: any = {};
      params.answer = this.textValue;
      params.questionId = this.questionId;
      this.sandbox.addAnswer(params);
    } else {
      this.error = true;
    }
  }

  deleteAnswer(id) {
    this.sandbox.deleteAnswer({ answerId: id });
  }

  changeStatus(event, id) {
    const params: any = {};
    params.answerId = +id;
    if (event) {
      params.status = 1;
      this.sandbox.changeAnswerStatus(params);
    } else {
      params.status = 0;
      this.sandbox.changeAnswerStatus(params);
    }
  }

  makeDefault(list) {
    if (list.defaultAnswer === 0) {
      this.answerId = list.answerId;
      const params: any = {};
      params.answerId = list.answerId;
      this.sandbox.makeDefaultAnswer(params);
    }

  }

  subscribe() {
    this.subscriptions.push(this.sandbox.deleteAnswer$.subscribe(data => {
      if (data && data.status === 1) {
        this.getAnswerList();
      }
    }));
    this.subscriptions.push(this.sandbox.addAnswer$.subscribe(data => {
      if (data && data.status === 1) {
        this.textValue = '';
        this.getAnswerList();
      }
    }));

    this.subscriptions.push(this.sandbox.defaultAnswer$.subscribe(data => {
      if (data && data.status === 1) {
        this.defaultAnswer = this.answerId;
        this.getAnswerList();

      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
