export interface TableColumnType<T = any> {
    title: string;
    dataIndex: string;
    render?: (value: any, record?: T) => any;
}