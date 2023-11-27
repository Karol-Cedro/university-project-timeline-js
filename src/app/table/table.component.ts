import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataSharingService} from "../data-sharing.service";
import {PopUpFormComponent} from "../pop-up-form/pop-up-form.component";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit {

  displayedColumn: string[];
  dataSource: MatTableDataSource<any>;
  filteredDatasource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  selectedItemIdx = null;
  selectedRow = null;

  eventEndDate = new Date();
  eventStartDate = new Date();

  datePipe = new DatePipe("en-GB", undefined, undefined);

  constructor(private dataSharingService: DataSharingService, public dialog: MatDialog) {
    this.displayedColumn = ['position', 'eventName', 'eventStartDate', 'eventEndDate', 'eventDescription', 'eventImageUrl', 'eventCategory'];
    this.fetchData();
  }

  fetchData() {
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
      event.eventStartDate >= this.transformDate(this.eventStartDate) && event.eventEndDate <= this.transformDate(this.eventEndDate)
    );
    this.filteredDatasource = new MatTableDataSource(filteredData);
    this.filteredDatasource.paginator = this.paginator;
    this.filteredDatasource.sort = this.sort;
  }

  rowSelected(selectedItemIdx) {

    this.selectedRow = selectedItemIdx;
    this.selectedItemIdx = this.filteredDatasource.data.find(item => item.position === selectedItemIdx + 1).position;
  }

  deleteSelected() {
    let item = this.filteredDatasource.data.splice(this.selectedRow, 1);
    this.refresh();
    this.selectedItemIdx = null;
    this.selectedRow = null;
    this.dataSharingService.removeItemById(item[0].position);
  }

  refresh() {
    this.filteredDatasource.data = this.filteredDatasource.data;
    this.filteredDatasource.paginator = this.paginator;
    this.filteredDatasource.sort = this.sort;
  }

  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(PopUpFormComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSharingService.addNewItem(this.addNewEvent(result)[0]);
        this.fetchData();
        this.refresh();
      }
    });
  }

  addNewEvent(result) {
    let position = this.dataSharingService.getNextId();
    let newItem: any[] = [{
      position: position,
      eventName: result.eventName,
      eventStartDate: this.transformDate(result.eventStartDate),
      eventEndDate: this.transformDate(result.eventEndDate),
      eventDescription: result.eventDescription,
      eventImageUrl: result.eventImageUrl,
      eventCategory: result.eventCategory
    }];
    return newItem;
  }

  openUpdateEventDialog() {
    let result = this.filteredDatasource.data.find(item => item.position === this.selectedItemIdx);
    const dialogRef = this.dialog.open(PopUpFormComponent, {
      width: '350px',
      data: {
        eventName: result.eventName,
        eventStartDate: result.eventStartDate,
        eventEndDate: result.eventEndDate,
        eventDescription: result.eventDescription,
        eventImageUrl: result.eventImageUrl,
        eventCategory: result.eventCategory
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEvent(result);
        this.fetchData();
        this.refresh();
      }
    });
  }

  updateEvent(result) {
    let updatedItem: any[] = [{
      position: this.selectedItemIdx,
      eventName: result.eventName,
      eventStartDate: this.transformDate(result.eventStartDate),
      eventEndDate: this.transformDate(result.eventEndDate),
      eventDescription: result.eventDescription,
      eventImageUrl: result.eventImageUrl,
      eventCategory: result.eventCategory
    }];
    this.filteredDatasource.data.splice(this.selectedRow, 1);
    this.filteredDatasource.data.push(updatedItem[0]);
    this.dataSharingService.removeItemById(this.selectedItemIdx);
    this.dataSharingService.addNewItem(updatedItem[0]);
    this.selectedItemIdx = null;
    this.selectedRow = null;
  }

  transformDate(date: Date) {
    return this.datePipe.transform(new Date(date), "yyyy-MM-dd");
  }

}
