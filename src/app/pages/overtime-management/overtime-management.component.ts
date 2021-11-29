import { Component, OnInit } from '@angular/core';
import { format, parse } from 'date-fns';
import { TableColumnType } from 'src/app/shared/models/table-column.model';
import { User } from 'src/app/user.model';
import { utils, WorkBook, WorkSheet, writeFile } from 'xlsx';
import { ApplicationService } from '../overtime-filling/application.service';

@Component({
  selector: 'app-overtime-management',
  templateUrl: './overtime-management.component.html',
  styleUrls: ['./overtime-management.component.less'],
})
export class OvertimeManagementComponent implements OnInit {
  public columns: TableColumnType[] = [
    {
      title: '工号',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      render: (value, record) =>
        this.userList.find((user) => user.id === record.id)?.name,
    },
    {
      title: '加班日期',
      dataIndex: 'date',
      render: (value) => (value ? format(new Date(value), 'yyyyMMdd') : null),
    },
    {
      title: '加班开始时间',
      dataIndex: 'startTime',
      render: (value) => (value ? value.split(':').join('') : null),
    },
    {
      title: '加班结束时间',
      dataIndex: 'endTime',
      render: (value) => (value ? value.split(':').join('') : null),
    },
    {
      title: '休息开始时间',
      dataIndex: 'restStartTime',
      render: (value) => (value ? value.split(':').join('') : null),
    },
    {
      title: '休息结束时间',
      dataIndex: 'restEndTime',
      render: (value) => (value ? value.split(':').join('') : null),
    },
    {
      title: '休息时数',
      dataIndex: 'restHours',
      render: (value, record) => {
        try {
          const restStartTime = parse(
            record.restStartTime,
            'HH:mm',
            new Date()
          ).getTime();
          const restEndTime = parse(
            record.restEndTime,
            'HH:mm',
            new Date()
          ).getTime();
          const restTime =
            restEndTime >= restStartTime
              ? restEndTime - restStartTime
              : restEndTime + 24 * 60 * 60 * 1000 - restStartTime;
          return Math.floor((restTime / 1000 / 60 / 60) * 100) / 100;
        } catch {
          return null;
        }
      },
    },
    {
      title: '加班时数',
      dataIndex: 'overtimeHours',
      render: (value, record) => {
        try {
          const startTime = parse(
            record.startTime,
            'HH:mm',
            new Date()
          ).getTime();
          const endTime = parse(record.endTime, 'HH:mm', new Date()).getTime();
          const time =
            endTime >= startTime
              ? endTime - startTime
              : endTime + 24 * 60 * 60 * 1000 - startTime;
          return Math.floor((time / 1000 / 60 / 60) * 100) / 100;
        } catch {
          return null;
        }
      },
    },
    {
      title: '加班报酬类型',
      dataIndex: 'payType',
      render: (value) => {
        if (value === 1) {
          return '1 支付加班费';
        } else if (value === 2) {
          return '2 用于调休';
        } else if (value === 3) {
          return '3 仅记录';
        }
        return null;
      },
    },
    {
      title: '在公司加班',
      dataIndex: 'inCompany',
      render: (value) => (value ? 'X 是' : null),
    },
    {
      title: '加班事由',
      dataIndex: 'reason',
    },
  ];

  public dataSource: any = [];

  private userList: User[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.applicationService
      .getUserList()
      .subscribe((response) => (this.userList = response));
    this.applicationService.getApplicationList().subscribe((response) => {
      this.dataSource = response;
    });
  }

  exportAll() {
    const ws: WorkSheet = utils.aoa_to_sheet(this.getExcelValue());
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, '考勤.xlsx');
  }

  getExcelValue() {
    const header = this.columns.map((column) => column.title);
    const tableValue = this.dataSource.map((data: { [x: string]: any }) =>
      this.columns.map((column) =>
        column.render
          ? column.render(data[column.dataIndex], data)
          : data[column.dataIndex]
      )
    );
    return [header, ...tableValue];
  }
}
