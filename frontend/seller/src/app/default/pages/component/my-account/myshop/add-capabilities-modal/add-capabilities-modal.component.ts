import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-capabilities-modal',
  templateUrl: './add-capabilities-modal.component.html',
  styleUrls: ['./add-capabilities-modal.component.scss']
})
export class AddCapabilitiesModalComponent implements OnInit {
  // form variables
   data: UntypedFormControl;
   status:UntypedFormControl
   capabilitesForm: UntypedFormGroup;
  submitted:Boolean = false;
  editedValues: any;
    // Edit variables
    editedIndex = null;
  constructor(private activeModal: NgbActiveModal,  private modalService: NgbModal,public formBuilder:UntypedFormBuilder ) { }

  ngOnInit(): void {
    this.capabilitesForm = this.formBuilder.group({
      data: ['',  Validators.compose([Validators.required])],
      status: [false]
    });
// set value
if(this.editedIndex >= 0 && this.editedIndex != null) {
  this.capabilitesForm?.controls['data']?.setValue(this.editedValues?.data);
  this.capabilitesForm?.controls['status']?.setValue(this.editedValues?.status);
 }
}

save(){
  this.submitted = true;
  if(this.capabilitesForm.valid) {
    this.activeModal.close({...this.capabilitesForm.value, modelStatus: 'save'});
  }
  
}

public dismiss() {
  this.activeModal.close();
}

}
