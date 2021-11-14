import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    console.log(this.form.value)
    const { date, ...rest } = this.form.value;
    this.applicationService.createApplication({
      date: date ? format(new Date(date), 'yyyy-MM-dd') : null,
      ...rest,
    }).subscribe(response => {
      alert('发送成功');
    });
  }
}
