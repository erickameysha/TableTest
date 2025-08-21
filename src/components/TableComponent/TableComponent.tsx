import {Button, Card, Input, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import type {DataType} from "../../types/types.ts";


type TableComponentProps = {
    data: DataType[]
    onEdit: (item: DataType) => void
    onDelete: (key: string) => void
    onAdd: () => void
    onSearch: (value: string) => void
    searchValue: string
}

const TableComponent = ({data, onEdit, onSearch, searchValue, onDelete, onAdd}: TableComponentProps) => {
    const colums = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            sorter: (a: DataType, b: DataType) => b.number - a.number,
            // filteredValue: [searchTitle],

        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date ',
            render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
            sorter: (a: DataType, b: DataType) => dayjs(b.date).unix() - dayjs(a.date).unix()
        },
        {
            title: 'Action',
            key: 'action',
            width: 50,
            render: (_: unknown, record: DataType) => (
                <Space direction={window.innerWidth < 768 ? 'vertical' : 'horizontal'} size={'small'}>
                    <Button
                        icon={<EditOutlined/>}
                        size={'small'}
                        className={'action-btn'}
                        type="primary"
                        onClick={() => onEdit(record)}/>

                    <Button
                        type="primary"
                        className={'action-btn'}
                        icon={<DeleteOutlined/>}
                        danger
                        size={'small'}
                        onClick={() => onDelete(record.key)}/>

                </Space>
            )

        }
    ]
    return (
        <Card className={'table-card'}>
            <div className="search-section">
                <Input
                    placeholder="Поиск по имени, дате и числу"
                    value={searchValue}
                    className={'search-input'}
                    onChange={(e) => onSearch(e.currentTarget.value)}/>
                <Button type={'primary'} icon={<PlusOutlined/>} onClick={onAdd}>Добавить</Button>
            </div>
            <Table
                className={'data-table'}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
                dataSource={data}
                columns={colums}/>
        </Card>
    );
};

export default TableComponent;