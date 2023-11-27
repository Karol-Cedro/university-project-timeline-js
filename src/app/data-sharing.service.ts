import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  datePipe = new DatePipe("en-GB", undefined, undefined);

  private timelineDataSubject: BehaviorSubject<any>;
  timelineData$: Observable<any[]>;

  constructor() {
    this.timelineDataSubject = new BehaviorSubject<any[]>([]);
    this.timelineData$ = this.timelineDataSubject.asObservable();
    this.timelineDataSubject.next(this.EVENT_DATA);
  }

  updateTimelineData(data: any[]): void {
    this.timelineDataSubject = new BehaviorSubject<any[]>([]);
    this.timelineData$ = this.timelineDataSubject.asObservable();
    this.timelineDataSubject.next(data);
  }

  addNewItem(data: any[]) {
    const currentArray = this.timelineDataSubject.getValue();
    const updatedArray = [...currentArray, data];
    this.timelineDataSubject.next(updatedArray);
    this.timelineData$ = this.timelineDataSubject.asObservable();
  }

  getNextId() {
    const sortedPositions = this.timelineDataSubject.value.map(obj => obj.position).sort((a, b) => a - b);

    for (let i = 1; i <= sortedPositions.length; i++) {
      if (sortedPositions[i - 1] !== i) {
        return i;
      }
    }

    return sortedPositions.length + 1;
  }

  removeItemById(id: number): void {
    const updatedTimelineData = this.timelineDataSubject.value.filter(item => item.position !== id);
    this.updateTimelineData(updatedTimelineData);
  }

  EVENT_DATA: any[] = [
    {
      position: 1,
      eventName: 'Event1',
      eventStartDate: this.datePipe.transform(new Date('2023-10-20'), "yyyy-MM-dd"),
      eventEndDate: this.datePipe.transform(new Date('2023-10-20'), "yyyy-MM-dd"),
      eventDescription: 'Description1',
      eventImageUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-small-diamond-geometric-blue-38006.png',
      eventCategory: 'Category1'
    },
    {
      position: 2,
      eventName: 'Event2',
      eventStartDate: this.datePipe.transform(new Date('2023-10-14'), "yyyy-MM-dd"),
      eventEndDate: this.datePipe.transform(new Date('2023-10-14'), "yyyy-MM-dd"),
      eventDescription: 'Description2',
      eventImageUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-small-diamond-geometric-blue-38006.png',
      eventCategory: 'Category2'
    },
    {
      position: 3,
      eventName: 'Event3',
      eventStartDate: this.datePipe.transform(new Date('2023-10-18'), "yyyy-MM-dd"),
      eventEndDate: this.datePipe.transform(new Date('2023-10-18'), "yyyy-MM-dd"),
      eventDescription: 'Description3',
      eventImageUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-small-diamond-geometric-blue-38006.png',
      eventCategory: 'Category3'
    },
    {
      position: 4,
      eventName: 'Event4',
      eventStartDate: this.datePipe.transform(new Date('2023-10-16'), "yyyy-MM-dd"),
      eventEndDate: this.datePipe.transform(new Date('2023-10-19'), "yyyy-MM-dd"),
      eventDescription: 'Description4',
      eventImageUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-small-diamond-geometric-blue-38006.png',
      eventCategory: 'Category4'
    },
    {
      position: 5,
      eventName: 'Event5',
      eventStartDate: this.datePipe.transform(new Date('2023-10-25'), "yyyy-MM-dd"),
      eventEndDate: this.datePipe.transform(new Date('2023-10-25'), "yyyy-MM-dd"),
      eventDescription: 'Description5',
      eventImageUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-small-diamond-geometric-blue-38006.png',
      eventCategory: 'Category5',
    },
    {
      position: 6,
      eventName: 'Event6',
      eventStartDate: this.datePipe.transform(new Date('2023-10-27'), "yyyy-MM-dd"),
      eventEndDate: this.datePipe.transform(new Date('2023-10-27'), "yyyy-MM-dd"),
      eventDescription: 'Description6',
      eventImageUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-small-diamond-geometric-blue-38006.png',
      eventCategory: 'Category6'
    }
  ];
}

