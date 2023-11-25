import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSet, Timeline, TimelineOptions} from "vis";
import {DataSharingService} from "../data-sharing.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements AfterViewInit, OnInit {
  timeline: any;

  @ViewChild('timelineContainer') timelineContainer: ElementRef;

  constructor(private dataSharingService: DataSharingService) {
  }

  ngAfterViewInit(): void {
    const container = this.timelineContainer.nativeElement;
    let items = new DataSet();
    this.dataSharingService.timelineData$.subscribe((data) => {
      data.forEach((element) => {
        if (element.eventStartDate === element.eventEndDate) {
          items.add({
            id: element.position,
            content: element.eventName,
            start: element.eventStartDate,
            title: `<p>Name: ${element.eventName}</p>
                      <p>Start date: ${element.eventStartDate}</p>
                      <p>End date: ${element.eventEndDate}</p>
                      <p>Description: ${element.eventDescription}</p>
                      <p>Image: <img src="${element.eventImageUrl}" alt="image" width="30px" height="30px"></p>
                      <p>Category: ${element.eventCategory}</p>`
          })
        } else {
          items.add({
            id: element.position,
            content: element.eventName,
            start: element.eventStartDate,
            end: element.eventEndDate,
            title: `<p>Name: ${element.eventName}</p>
                      <p>Start date: ${element.eventStartDate}</p>
                      <p>End date: ${element.eventEndDate}</p>
                      <p>Description: ${element.eventDescription}</p>
                      <p>Image: <img src="${element.eventImageUrl}" alt="image" width="30px" height="30px"></p>
                      <p>Category: ${element.eventCategory}</p>`
          })
        }
      });
    });

    const options: TimelineOptions = {
      showTooltips: true,
      tooltip: {
        overflowMethod: "flip",
      },
      height: '400px',
    };

    this.timeline = new Timeline(container, items, options);
  }

  ngOnInit(): void {
    this.dataSharingService.timelineData$.subscribe((data) => {
    });
  }
}
