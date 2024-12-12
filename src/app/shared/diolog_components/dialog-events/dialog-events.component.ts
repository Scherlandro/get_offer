import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IEvents} from "../../../interfaces/events";

@Component({
  selector: 'app-dialog-events',
  templateUrl: './dialog-events.component.html',
  styleUrls: ['./dialog-events.component.css']
})
export class DialogEventsComponent implements OnInit {
  element!: IEvents;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public iEvents: IEvents,
    public dialogRef: MatDialogRef<DialogEventsComponent>
  ) {}


  ngOnInit(): void {
    if (this.iEvents.id_event != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}
