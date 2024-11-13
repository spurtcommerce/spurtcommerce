import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';


  
@Component({
  selector: 'app-product-specification-modal',
  templateUrl: './product-specification-modal.component.html',
  styleUrls: ['./product-specification-modal.component.scss']
})
export class ProductSpecificationModalComponent implements OnInit {
  /*edit*/
  public edit: any;
  public name:any;
  public categoryId: any;
  public familyprimarylist: any;
  public primaryKey: any;
  private subscriptions: Array<Subscription> = [];
  private subscription = new Subscription();
  constructor(private activeModal: NgbActiveModal, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  //  this.getList()

  }

  // getList(): void{
  //   this.FamilySandbox.familyprimaryKey({});
  //   this.subscription.add(this.FamilySandbox.familyprimaryKey$.subscribe(val => {
  //     this.familyprimarylist = [...val]
  //     this.cd.detectChanges()

  //   }))
  // }
  // delete(specificationId: any, i: any): void {
  //   this.edit.splice(i, 1)
  //   this.edit = [...this.edit]
  //   let id = ''
  //   this.familyprimarylist.forEach((val, ind) => {
  //     if (val.categoryId == this.categoryId && val.specificationId == specificationId) {
  //       this.primaryKey = val.id
  //       id = val.id
  //     }
  //   })

  //   this.FamilySandbox.familyprimaryDelete(this.primaryKey);
  //   this.FamilySandbox.familyprimaryDelete$.subscribe(val => {
  //     if (val.status == 0) {
  //       this.cd.detectChanges();
  //     }
  //   })
  

  // }


  public close(){
    this.activeModal.close("close");
  }

  public dismiss() {
    this.activeModal.close("save");
  }

  public save(): void {
    this.dismiss()
  }

  public cancel(): void{
    this.dismiss()
  }



}
