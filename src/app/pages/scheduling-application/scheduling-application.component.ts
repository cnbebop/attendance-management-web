import { AfterViewChecked, Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addDays, format, getDate, getDay, getMonth, getWeek, getYear, isMonday, isSaturday, isSunday, isWeekend, nextMonday, nextSunday, previousMonday, startOfToday } from 'date-fns';
import { ApplicationService } from '../overtime-filling/application.service';
import { Moment } from 'moment';

@Injectable()
export class OneWeekRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dataAdapter: DateAdapter<D>) { }

  selectionFinished(date: D | null): DateRange<any> {
    return this._createOneWeekRange(date);
  }
  createPreview(activeDate: D | null): DateRange<any> {
    return this._createOneWeekRange(activeDate);
  }

  private _createOneWeekRange(date: D | null): DateRange<D> {
    if (date) {
      const current = this._toNativeDate(date);
      const start = isMonday(current) ? date : this._toAdapterDate(previousMonday(current));
      const end = isSunday(current) ? date : this._toAdapterDate(nextSunday(current));
      return new DateRange<D>(start, end);
    }
    return new DateRange<D>(null, null);
  }


  private _toAdapterDate(date: Date): D {
    return this._dataAdapter.createDate(getYear(date), getMonth(date), getDate(date));
  }

  private _toNativeDate(date: D): Date {
    return new Date(this._dataAdapter.getYear(date), this._dataAdapter.getMonth(date), this._dataAdapter.getDate(date));
  }
}

@Component({
  selector: 'app-scheduling-application',
  templateUrl: './scheduling-application.component.html',
  styleUrls: ['./scheduling-application.component.less'],
})
export class SchedulingApplicationComponent implements OnInit {

  public dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  public applicationForm: FormGroup;


  constructor(
    private applicationService: ApplicationService,
    private dialogRef: MatDialogRef<SchedulingApplicationComponent>,
    private snakeBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {
    this.applicationForm = this.buildFormGroup();
  }

  get planFormArray() {
    return this.applicationForm.get('plans') as FormArray;
  }

  ngOnInit(): void {

  }

  buildFormGroup(): FormGroup {
    const currentTime = startOfToday();
    const startTime = nextMonday(currentTime);
    const endTime = nextSunday(startTime);
    return this._formBuilder.group({
      userId: null,
      startTime,
      endTime,
      plans: this._buildPlansControl(startTime, 7),
    })
  }

  handleSubmit() {
    const { userId, startTime, plans } = this.applicationForm.value;
    const paramList = (<{ work: boolean, type: string }[]>plans).map(({ work, type }, index) => ({
      userId,
      date: format(addDays(new Date(startTime), index), 'yyyy-MM-dd'),
      work,
      type: work ? type : null,
    }));
    this.applicationService.createSchedulingApplication(paramList).subscribe(response => {
      this.dialogRef.close();
      this.snakeBar.open('发送成功', undefined, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  onDateChange(event: any) {
    const { startTime, endTime }: { startTime: Moment, endTime: Moment | null } = this.applicationForm.value;
    let dateRange = 1;
    if (endTime) {
      dateRange = endTime.diff(startTime, 'day') + 1;
    }
    this.applicationForm.setControl('plans', this._buildPlansControl(startTime.toDate(), dateRange));
  }

  private _buildPlansControl(startTime: Date, dateRange: number) {
    return this._formBuilder.array(Array(dateRange).fill(startTime).map((item, index) =>
      this._formBuilder.group({
        work: !isWeekend(addDays(item, index)), 
        type: 'D1', 
        date: format(addDays(item, index), 'yyyy-MM-dd'),
        week: this.dayNames[getDay(addDays(item, index))]
      })));
  }
}
