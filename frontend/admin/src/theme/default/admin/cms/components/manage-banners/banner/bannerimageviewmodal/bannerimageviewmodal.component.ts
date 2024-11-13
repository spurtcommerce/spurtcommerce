import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/core/admin/service/config.service';

@Component({
  selector: 'app-bannerimageviewmodal',
  standalone: false,
  templateUrl: './bannerimageviewmodal.component.html',
  styleUrl: './bannerimageviewmodal.component.scss'
})
export class BannerimageviewmodalComponent {
@Input() bannerDetails:any
@Input() banerName:any;
public imageUrl: string;
image:any;
indexAdded:number = 1
  constructor(private activeModal: NgbActiveModal, private configService: ConfigService,private ref:ChangeDetectorRef) { }

  ngOnInit(): void {
     // Get Image
     this.image = this.bannerDetails[0];
     this.imageUrl = this.configService.getImageUrl();
  }

  imageActive(img,index){
    this.image = img
    this.indexAdded = index+1;
    this.ref.detectChanges();
  }

  public dismiss() {
    this.activeModal.close();
  }

}
