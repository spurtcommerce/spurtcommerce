import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements AfterViewInit {
    private pageSize: number = 10
    private pageNumber: number = 0
    private page: number = 1
    lengthValue: number
    @Input() perPageCount:boolean;


    @ViewChild("paginatorInput") paginatorInput: ElementRef

    error: boolean = false
    Last: number;
    @Input() set length(value: number) {
        if (value) {
            this.lengthValue = value ? value : 1
            if(this.lengthValue){
                this.pageNumber = Math.ceil(value / this.pageSize)
            }
           
        }
    }
    @Input() set pages(value) {
        if (value) {
            this.pageSize = value ? value : 1
            this.pageNumber = Math.ceil(this.lengthValue / value)
        }
    }
    @Input() set index(value: number) {
         this.Last = value
        if (value === 0 || value) {
            this.page = value
        }
    }

    @Output() getPage = new EventEmitter()

    resetIndex() {
        this.setPageIndex(this.index)
    }

    get index() {
        return JSON.parse(localStorage.getItem('adminProductPageIndex'))
    }

    get length() {
        return this.pageNumber
    }

    

    private getPageIndex(): string {
        return localStorage.getItem("adminProductPageIndex")
    }

    private setPageIndex(index: number): void {
        if(this.perPageCount == false && localStorage.getItem('pagination')){
            const index = 1
            localStorage.setItem("adminProductPageIndex", `${index}`)
        }
        else  if(this.perPageCount == false){
            localStorage.setItem("adminProductPageIndex", `${index}`)
            }
            
        else if (this.perPageCount == true){

            const indexs = 1
            localStorage.setItem("adminProductPageIndex", `${indexs}`)
        }
        else {
            localStorage.setItem("adminProductPageIndex", `${index}`)
        }
    }
    constructor(private changeDetector: ChangeDetectorRef, public router: Router) { 
        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
        
        });
    }

    ngAfterViewInit() {
        const getPageIndex = this.getPageIndex()
        if (getPageIndex) {
            this.index = parseInt(getPageIndex, 10)
            this.error = false
        }
        fromEvent(this.paginatorInput.nativeElement, "input")
            .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
            .pipe(debounceTime(1000))
            .pipe(distinctUntilChanged())
            .subscribe(page => this.getPageNumber(page))
    }

    ngOnChanges() {
        this.resetIndex();
    }

    firstClick() {
        if (this.index > 1) {
            this.index = 1
            this.getPage.emit({index:1,align:'First'})
            this.setPageIndex(this.page)
            this.changeDetector.detectChanges()

        }
    }

    leftClick() {
        if (this.index > 1) {
          const value =  (this.index - 1);
            this.index = value
            this.getPage.emit({index:value,align:'Left'});
            this.setPageIndex(this.page);
      }
      this.changeDetector.detectChanges()
    }

    rightClick() {
        if (this.index < this.length) {
            const value =   (this.index += 1)
            this.index = value
            this.getPage.emit({index:value,align:'Right'})
            this.setPageIndex(this.page)
        }
        this.changeDetector.detectChanges()
    }

    lastClick() {
        if(this.length){
            this.index = this.length;
            this.getPage.emit({index:this.length,align:'Last'})
            this.setPageIndex(this.page)
        }
        this.changeDetector.detectChanges()
       
    }



    getPageNumber(page: string) {
        this.index = parseInt(page, 50)
        if (this.index > 0 && this.index < this.length) {
            this.error = false
            this.getPage.emit(this.index)
            this.setPageIndex(this.page)
        } else {
            this.error = true
            this.changeDetector.markForCheck()
        }
    }
}
