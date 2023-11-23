import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {DataSet, Timeline} from "vis";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements AfterViewInit {
  timeline: any;

  @ViewChild('timelineContainer') timelineContainer: ElementRef;

  ngAfterViewInit(): void {
    const container = this.timelineContainer.nativeElement;

    const items = new DataSet([
      {id: 1, content: 'item 1', start: '2014-04-20'},
      {id: 2, content: 'item 2', start: '2014-04-14'},
      {id: 3, content: 'item 3', start: '2014-04-18'},
      {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
      {id: 5, content: 'item 5', start: '2014-04-25'},
      {id: 6, content: 'item 6', start: '2014-04-27'}
    ]);

    const options = {};

    this.timeline = new Timeline(container, items, options);
  }
}
