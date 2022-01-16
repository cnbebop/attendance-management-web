export interface TableColumnType<T = any> {
    title: string;
    dataIndex: string;
    sticky?: boolean;
    render?: (value: any, record?: T) => any;
}