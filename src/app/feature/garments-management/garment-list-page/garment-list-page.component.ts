import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GarmentDataSource } from './../garment-api/garment-data-source';
import { GarmentApiService } from '../garment-api/garment-api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { tap, merge } from 'rxjs/operators';

@Component({
  selector: 'app-garment-list-page',
  templateUrl: './garment-list-page.component.html',
  styleUrls: ['./garment-list-page.component.css']
})
export class GarmentListPageComponent implements AfterViewInit, OnInit {

  columnHeader: string[];
  dataSource: GarmentDataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private garmentApiService: GarmentApiService) { }

  ngOnInit(): void {
    this.columnHeader = [ 'purchaseNumber', 'garmentName', 'purchaseDate', 'materialName', 'materialColor', 'materialWeight', 'materialPrice', 'totalAmount', 'balanceAmount' ];
    this.setDataSourceValue();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.dataSource.loadAllGarmentValues(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    });
    this.paginator.page.subscribe(() => {
      this.dataSource.loadAllGarmentValues(this.sort.active, this.sort.direction, (this.paginator.pageIndex * this.paginator.pageSize), (this.paginator.pageSize * (this.paginator.pageIndex + 1)));
    });
  }

  private setDataSourceValue() {
    this.dataSource = new GarmentDataSource(this.garmentApiService);
    this.dataSource.loadAllGarmentValues('purchaseDate', '', 0, 2);
  }

}
