import {DatePicker, Form, Input, Modal} from "antd";

import dayjs from "dayjs";
import {useEffect} from "react";
import type {DataType, FormValues} from "../../types/types.ts";

type TableModalProps = {
    visible: boolean;
    onCancel: () => void;
    onOk: (value: FormValues) => void;
    editItem: DataType | null
    title: string
}
const TableModal = ({title, editItem, visible, onCancel, onOk}: TableModalProps) => {
    const [form] = Form.useForm()
    const handelOk = () => {
        form.validateFields().then((values) => {
            onOk(values)
            form.resetFields()
        })
    }
    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }
    useEffect(() => {
        if (visible && editItem) {
            form.setFieldsValue({
                ...editItem,
                date: editItem.date ? dayjs(editItem.date) : null
            })
        } else if (visible && !editItem) {
            form.resetFields()
        }
    }, [editItem, visible, form])
    return (
        <Modal title={title} onCancel={handleCancel}
               open={visible} onOk={handelOk}
               className={'custom-modal'}
               maskClosable={true}
        >

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
    );
};

export default TableModal;