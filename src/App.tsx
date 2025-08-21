import './App.css'
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import TableComponent from "./components/TableComponent/TableComponent.tsx";
import TableModal from "./components/TableComponent/TableModal.tsx";
import {useState} from "react";
import type {DataType, FormValues} from "./types/types.ts";

function App() {
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
            date: '2025-10-03'
        },
        {
            key: '3',
            name: 'Alex',
            number: 46,
            date: '2025-11-03'
        },
    ])
    const [editKey, setEditKey] = useState<DataType | null>(null)
    const [searchTitle, setSearchTitle] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const filteredData = searchTitle
        ? data.filter(record =>
            record.name.toLowerCase().includes(searchTitle.toLowerCase()) ||
            record.number.toString().includes(searchTitle) ||
            record.date.includes(searchTitle)
        )
        : data;
    const handleAdd = () => {
        setEditKey(null)
        setIsOpen(true)
    }
    const handleEdit = (item: DataType) => {
        setEditKey(item)
        setIsOpen(true)
    }
    const handleDelete = (item: string) => {
        setData(data.filter(el => el.key !== item))
    }
    const handleModalOk = (value: FormValues) => {
        const newItem: DataType = {
            ...value,
            date: value.date ? value.date.format('YYYY-MM-DD') : '',
            key: editKey?.key || String(Date.now()),
        }
        if (editKey) {
            setData(data.map(item => item.key === editKey.key ? newItem : item))
        } else {
            setData([newItem, ...data])
        }
        setIsOpen(false)
        setEditKey(null)

    }
    const handleModalCancel = () => {
        setIsOpen(false)
        setEditKey(null)
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content>
                <div>
                    <TableComponent
                        data={filteredData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAdd={handleAdd}
                        onSearch={setSearchTitle}
                        searchValue={searchTitle}
                    />
                    <TableModal
                        title={editKey ? "Редактирование записи" : "Добавление записи"}
                        visible={isOpen}
                        editItem={editKey}
                        onOk={handleModalOk}
                        onCancel={handleModalCancel}
                    />
                </div>
            </Content>
        </Layout>
    )
}

export default App
