import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paging-control',
  templateUrl: './paging-control.component.html',
  styleUrls: ['./paging-control.component.scss']
})
export class PagingControlComponent {

  // Page number
  @Input()
  page: number = 1;
  @Output()
  pageChange = new EventEmitter<number>();

  //Page size

  @Input()
  size: number = 50;
  @Output()
  sizeChange = new EventEmitter<number>();

  /**
 * Event is fired whn page size changed, page number changed
 */
  @Output() onLoadPageData = new EventEmitter<PagingEvent>();

  // Number of records
  @Input()
  total: number;

  /**
   * If it set to true, the paging control should fire onLoadPageData when it is ready, only one time
   */
  @Input()
  loadPageDataOnReady: boolean;

  /**
   * Hide dropdown list page selection
   */
  @Input()
  isHidePageSelect: boolean = false;
  totalPage: number;
  fromRecord: number;
  toRecord: number;
  lstPage: number[];

  constructor() {}

  private isFirstLoadReady = false;
  ngAfterContentInit(): void {
    if(this.loadPageDataOnReady && !this.isFirstLoadReady) {
      this.loadPageData(1);
      this.isFirstLoadReady = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes && changes ['total'] && changes['total'].previousValue !== changes['total'].currentValue) {
      this.calcTotalPage();
      this.calcRecordRange();
    }
  }

  loadPageData(page: number){
    this.page = page;
    this.pageChange.emit(page);
    this.onLoadPageData.emit({page: page, size: this.size})
  }


  private calcTotalPage(){
    if (this.total % this.size > 0) {
      this.totalPage = (this.total / this.size) +1;
    }else{
      this.totalPage = (this.total / this.size);
    }
    this.totalPage = Math.floor(this.totalPage);
    this.lstPage =[];
    for (let i = 0; i< this.totalPage; i++) {
      this.lstPage[i] = i + 1;
    }
  }

  private calcRecordRange() {
    this.fromRecord = this.page ? (((this.page -1) * this.size) + 1) : 1;
  }





}
