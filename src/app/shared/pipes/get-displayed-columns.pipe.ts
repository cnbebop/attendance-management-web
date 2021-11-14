import { Pipe, PipeTransform } from '@angular/core';
import { TableColumnType } from '../models/table-column.model';

@Pipe({
  name: 'getDisplayedColumns'
})
export class GetDisplayedColumnsPipe implements PipeTransform {

  transform(value: TableColumnType[]): string[] {
    return value.map(column => column.dataIndex);
  }

}
