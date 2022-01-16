import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { addDays, endOfMonth, format, getDay, getDaysInMonth, isMonday, isSunday, nextSunday, previousMonday, startOfMonth, startOfToday, startOfWeek } from 'date-fns';
import { TableColumnType } from 'src/app/shared/models/table-column.model';
import { User } from 'src/app/user.model';
import { utils, WorkBook, WorkSheet, writeFile } from 'xlsx';
import { ApplicationService } from '../overtime-filling/application.service';
import { SchedulingApplicationComponent } from '../scheduling-application/scheduling-application.component';

@Component({
  selector: 'app-scheduling-management',
  templateUrl: './scheduling-management.component.html',
  styleUrls: ['./scheduling-management.component.less']
})
export class SchedulingManagementComponent implements OnInit {
  public dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  public viewType: "weekly" | "monthly" = "weekly";

  public columns: TableColumnType[] = [
    {
      title: '工号',
      dataIndex: 'userId',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      sticky: true,
    },
    // {
    //   title: '排班日期',
    //   dataIndex: 'date',
    //   render: (value) => (value ? format(new Date(value), 'yyyyMMdd') : null),
    // },
    // {
    //   title: '排班类型',
    //   dataIndex: 'type',
    //   render: value => {
    //     const types: any = {
    //       Z01: '下午班(12:30-20:30)',
    //       Z02: '小夜班(17:30-01:00)',
    //       Z03: '大夜班(00:00-07:30)',
    //       Z04: '下午班(15:00-23:00)',
    //       Z05: '早班(05:30-14:00)',
    //       Z06: '下午班(13:00-21:00)',
    //       Z07: '早班(06:30-15:00)',
    //     };

    //     return value + ' ' + types[value];
    //   }
    // },
  ];

  public dataSource: any = [];

  public dateColumns: TableColumnType[] = this.getDateColumns(this.viewType);

  constructor(
    private applicationService: ApplicationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData(this.viewType);
  }

  getDateColumns(viewType: typeof this.viewType): TableColumnType[] {
    let dateList;
    if (viewType === 'weekly') {
      const start = startOfWeek(startOfToday(), { weekStartsOn: 1 });
      dateList = Array(7).fill(null).map((item, index) => addDays(start, index));
    } else {
      const start = startOfMonth(new Date());
      dateList = Array(getDaysInMonth(start)).fill(null).map((item, index) => addDays(start, index));
    }
    return dateList.map(date => ({
      title: format(date, 'M月d日'),
      dataIndex: format(date, 'yyyy-MM-dd'),
    }));
  }

  get tableColumns() {
    return [...this.columns, ...this.dateColumns];
  }


  onViewChange(event: MatButtonToggleChange) {
    this.dateColumns = this.getDateColumns(event.value);
    this.loadData(event.value);
  }


  loadData(viewType: typeof this.viewType) {
    let startTime, endTime;
    const now = startOfToday();
    if (viewType === 'weekly') {
      startTime = isMonday(now) ? now : previousMonday(now);
      endTime = addDays(isSunday(now) ? now : nextSunday(now), 1);
    } else {
      startTime = startOfMonth(now);
      endTime = addDays(endOfMonth(now), 1);
    }

    this.applicationService
      .getSchedulingApplicationList(startTime.toISOString(), endTime.toISOString())
      .subscribe((response) => {
        this.dataSource = response;
      });
  }

  application() {
    const dialogRef = this.dialog.open(SchedulingApplicationComponent, {
      width: '400px',
      maxWidth: '90vw',
      minWidth: 200,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData(this.viewType);
    });
  }

  getWeek(dateStr: string) {
    return this.dayNames[getDay(new Date(dateStr))];
  }

  getWeekColumns(dateColumns: TableColumnType[]) {
    return dateColumns.map(({ dataIndex }) => dataIndex + this.getWeek(dataIndex));
  }

  exportAll() {
    const ws: WorkSheet = utils.aoa_to_sheet(this.getExcelValue());
    const wb: WorkBook = utils.book_new();
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }]
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, '排班.xlsx');
  }

  getExcelValue() {
    const header = this.tableColumns.map((column) => column.title);
    const second = this.tableColumns.map((column) => {
      if (column.dataIndex !== 'userId' && column.dataIndex !== 'userName') {
        return this.getWeek(column.dataIndex);
      }
      return column.title;
    });
    const tableValue = this.dataSource.map((data: any) =>
      this.tableColumns.map((column) => {
        if (column.dataIndex === 'userId' || column.dataIndex === 'userName') {
          return column.render
            ? column.render(data[column.dataIndex], data)
            : data[column.dataIndex];
        } else {
          if (data.schedulings[column.dataIndex]) {
            return data.schedulings[column.dataIndex].work ? data.schedulings[column.dataIndex].type : 'OFF';
          } else {
            return '--';
          }
        }
      }

      )
    );
    return [header, second, ...tableValue];
  }
}
