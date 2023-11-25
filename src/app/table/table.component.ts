import {AfterViewInit, Component, NgModule, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataSharingService} from "../data-sharing.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit {

  displayedColumn: string[];
  dataSource;
  filteredDatasource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventEndDate = new Date();
  eventStartDate = new Date();

  constructor(private dataSharingService: DataSharingService) {
    this.displayedColumn = ['position', 'eventName', 'eventStartDate', 'eventEndDate', 'eventDescription', 'eventImageUrl', 'eventCategory'];
    this.dataSharingService.timelineData$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.filteredDatasource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.filteredDatasource.paginator = this.paginator;
    this.filteredDatasource.sort = this.sort;
  }

  applyFilter() {
    this.filteredDatasource = this.dataSource;
    const filteredData = this.dataSource.data.filter(event =>
      event.eventStartDate >= this.eventStartDate.toISOString().split('T')[0] && event.eventEndDate <= this.eventEndDate.toISOString().split('T')[0]
    );
    this.filteredDatasource = new MatTableDataSource(filteredData);
    this.filteredDatasource.paginator = this.paginator;
    this.filteredDatasource.sort = this.sort;
  }
}
