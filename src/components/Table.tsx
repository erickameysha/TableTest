import {Button, DatePicker, Form, Input, Modal, Table} from "antd";
import {type ChangeEvent, useState} from "react";
import dayjs from "dayjs";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

type DataType = {
    key: string
    name: string
    number: number
    date: string
}
const Tablee = () => {
    const [editKey, setEditKey] = useState<string | null>(null)
    const [searchTitle, setSearchTitle] = useState<string>("")
    const [data, setData] = useState<DataType[]>([
        {
            key: '1',
            name: 'Alex',
            number: 1,
            date: '2023-10-3'
        },
        {
            key: '2',
            name: 'Max',
            number: 45,
            date: '2025-10-3'
        },
        {
            key: '3',
            name: 'Alex',
            number: 46,
            date: '2025-11-3'
        },
    ])
    const colums = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
            // filteredValue: [searchTitle],
            // onFilter: (value: string, record: DataType) => {
            //     return (
            //         String(record.name).toLowerCase().includes(value.toLowerCase()) ||
            //         String(record.number).toLowerCase().includes(value.toLowerCase()) ||
            //         String(record.date).toLowerCase().includes(value.toLowerCase())
            //
            //     )
            // }
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
            sorter: (a: DataType, b: DataType) => dayjs(a.date).unix() - dayjs(b.date).unix()
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: DataType) => (
                <div>
                    <Button icon={<EditOutlined/>} type="primary" onClick={() => editHandler(record)}>edit</Button>
                    <Button type="primary" icon={<DeleteOutlined/>} danger
                            onClick={() => deleteHandler(record.key)}>delete</Button>
                </div>
            )

        }
    ]
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [form] = Form.useForm();
    const onOkClick = () => {
        form.validateFields().then((values) => {
                const newPerson = {
                    ...values,
                    date: values.date ? values.date.format('YYYY-MM-DD') : '',
                    key: editKey || String(Date.now()),
                }
                if (editKey) {
                    setData(data.map(item => item.key === editKey ? newPerson : item))
                } else {
                    setData([newPerson, ...data])

                }
                setIsOpen(false)
                setEditKey(null)
                form.resetFields()
            }
        )

    }

    function deleteHandler(key: string) {
        setData(data.filter(item => item.key !== key))
    }

    const editHandler = (item: DataType) => {
        setEditKey(item.key)
        form.setFieldsValue({
            ...item,
            date: item.date ? dayjs(item.date, 'YYYY-MM-DD') : null
        })
        setIsOpen(true)
    }

    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTitle(value)
    }
    const filteredData = searchTitle
        ? data.filter(record =>
            record.name.toLowerCase().includes(searchTitle.toLowerCase()) ||
            record.number.toString().includes(searchTitle) ||
            record.date.includes(searchTitle)
        )
        : data;
    return (
        <div>
            <div style={{display: 'flex'}} className="">
                <Input
                    onChange={onSearchHandler}/>
                <Button type={'primary'} icon={<PlusOutlined/>} onClick={() => {
                    setEditKey(null)
                    setIsOpen(true)
                    form.resetFields()
                }}>Добавить</Button>
            </div>
            <Modal title={editKey ? "Edit" : "Add Person"} onCancel={() => {
                setIsOpen(false)
                form.resetFields()
                setEditKey(null)
            }} open={isOpen} onOk={onOkClick}>
                <Form
                    form={form}
                    preserve={false}
                    name='editForm'
                    layout="vertical"
                >
                    <Form.Item name={'name'} label={'Name'}
                               rules={[{required: true, message: 'Please, write Name'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'number'} label={'Number'}
                               rules={[{required: true, message: 'Please, write date'}]}>
                        <Input type={'number'}/>
                    </Form.Item>
                    <Form.Item name={'date'} label={'Date'}
                               rules={[{required: true, message: 'Please, write date'}]}>
                        <DatePicker format={'DD.MM.YYYY'}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={filteredData} columns={colums}/>
        </div>
    )
}
export default Tablee