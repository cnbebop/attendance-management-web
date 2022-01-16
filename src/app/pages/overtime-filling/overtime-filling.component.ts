import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { format } from 'date-fns';
import { ApplicationService } from './application.service';

@Component({
  selector: 'app-overtime-filling',
  templateUrl: './overtime-filling.component.html',
  styleUrls: ['./overtime-filling.component.less']
})
export class OvertimeFillingComponent implements OnInit {

  public form = new FormGroup({
    id: new FormControl(null),
    date: new FormControl(null),
    startTime: new FormControl(null),
    endTime: new FormControl(null),
    restStartTime: new FormControl(null),
    restEndTime: new FormControl(null),
    payType: new FormControl(null),
    inCompany: new FormControl(null),
    reason: new FormControl(null),
  });

  constructor(
    private applicationService: ApplicationService,
    private dialogRef: MatDialogRef<OvertimeFillingComponent>,
    private snakeBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    const { date, ...rest } = this.form.value;
    this.applicationService.createApplication({
      date: date ? format(new Date(date), 'yyyy-MM-dd') : null,
      ...rest,
    }).subscribe(response => {
      this.dialogRef.close();
      this.snakeBar.open('发送成功', undefined, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
