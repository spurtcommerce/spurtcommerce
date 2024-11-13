import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderSandbox } from '../../../../../../../../../src/app/core/order/order.sandbox';
import { OrderService } from '../../../../../../../../../src/app/core/order/order.service';

@Component({
  selector: 'app-managetagsmodal',
  templateUrl: './managetagsmodal.component.html',
  styleUrl: './managetagsmodal.component.scss'
})
export class ManagetagsmodalComponent {
  constructor(private activeModal: NgbActiveModal, public orderService: OrderService) { }

  tag: string;
  tagList: any = [];
  submit: boolean = false;
  id: any = ''
  tagedit: any;
  removevalue: any;
  search: any = []
  dummyarray: any = []
  ngOnInit(): void {

    this.tagList = this.tagedit
    this.dummyarray = this.tagedit
  }

  public dismiss() {
    this.activeModal.close();
  }

  createData(): void {
    this.submit = true

    if (!['', null, undefined].includes(this.tag)) {
      this.submit = false
      let obj = {
        name: this.tag,
        checked: ''
      }
      this.tagList.push(obj)
      this.tag = ''
    }

  }

  searchByName(name) {
    const result = this.tagList.filter(tag => tag.name.includes(name));
    return result.length > 0 ? result : [];

  }
  changeinput(event): void {



    this.search = this.searchByName(event.target.value);

    if (['', null, undefined].includes(this.tag)) {
      this.tagList = this.dummyarray
    }




  }


  changecheckbox(event: any, i: any, item: any): void {

    this.tagList[i].checked = event.target.checked;
    this.dummyarray[i].checked=event.target.checked;

  }

  apicall() {
    let val = {
      tags: this.dummyarray.filter((val) => val.checked == true).map((values) => values.name).toString(),
      id: this.id
    }

    this.orderService.tagPost(val).subscribe((val) => {
      if (val && val.status == 1) {
        this.tagList = []
        this.dummyarray = val.data.tags.split(',').map(tag => ({ name: tag, checked: true }));
        this.activeModal.close({ method: 'success', res:  this.dummyarray });
      }
    })
  }

  enterapicall() {


    if(!['',null,undefined].includes(this.tag)){
      if (this.search?.length == 0) {
        let obj = {
          name: this.tag,
          checked: true
        }
        this.tagList.push(obj);
        let val = {
          tags: this.tagList.filter((val) => val.checked == true).map((values) => values.name).toString(),
          id: this.id
        }
        this.orderService.tagPost(val).subscribe((val) => {
          if (val && val.status == 1) {
            this.tag = ''
            let vals = val.productList[0]?.tags
            vals.map((bal) => {
              let obj = {
                name: bal,
                checked: true
              }
              this.tagList.push(obj)
              this.dummyarray = this.tagList
            })
            // this.tagList = [];
  
          }
        })
  
      } else {
        if (this.search.length > 0) {
          if (['', null, undefined].includes(this.tag)) {
            this.tagList = this.dummyarray
          } else {
            this.tagList = this.search
          }
        } else {
          if (['', null, undefined].includes(this.tag)) {
            this.tagList = this.dummyarray
          }
        }
      }
    }

  


  }

  save(): void {

    const uncheckedTags = this.dummyarray.filter(tag => tag.checked == false);


    this.submit = false

    if (uncheckedTags?.length > 0) {
      this.apicall();
    }else{

      if(['', null, undefined].includes(this.tag) && uncheckedTags?.length == 0){
        this.activeModal.close({ method: 'success', res: [...this.dummyarray] });
      }else{
        if(!['', null, undefined].includes(this.tag) && uncheckedTags?.length == 0 && this.search.length>0){
          this.activeModal.close({ method: 'success', res: [...this.dummyarray] });
        }
      }
    }
    
  }




}
