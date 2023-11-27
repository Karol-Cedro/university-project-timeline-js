import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
  eventName: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventDescription: string;
  eventImageUrl: string;
  eventCategory: string;
}

@Component({
  selector: 'app-pop-up-form',
  templateUrl: './pop-up-form.component.html',
  styleUrl: './pop-up-form.component.css'
})
export class PopUpFormComponent {
  eventName: string = '';
  eventStartDate: Date = new Date();
  eventEndDate: Date = new Date();
  eventDescription: string = '';
  eventImageUrl: string = '';
  eventCategory: string = '';

  constructor(public dialogRef: MatDialogRef<PopUpFormComponent>,  @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data) {
      this.eventName = data.eventName;
      this.eventStartDate = data.eventStartDate;
      this.eventEndDate = data.eventEndDate;
      this.eventDescription = data.eventDescription;
      this.eventImageUrl = data.eventImageUrl;
      this.eventCategory = data.eventCategory;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close({
      eventName: this.eventName,
      eventStartDate: this.eventStartDate,
      eventEndDate: this.eventEndDate,
      eventDescription: this.eventDescription,
      eventImageUrl: this.eventImageUrl,
      eventCategory: this.eventCategory
    });
  }
}
