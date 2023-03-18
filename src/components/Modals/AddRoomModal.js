import { Form, Input, Modal } from 'antd'
import { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

function AddRoomModal() {

    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { uid } = useContext(AuthContext)
    const [form] = Form.useForm();

    const handleOk = () => {

        //add new room
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] })

        //rest form value
        form.resetFields()

        setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        //rest form value
        form.resetFields()
        
        setIsAddRoomVisible(false)
    }

    return (
        <div>
            <Modal
                title="Create Room"
                open={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label="Name room" name='name'>
                        <Input placeholder="Enter room name" />
                    </Form.Item>

                    <Form.Item label="description" name='description' >
                        <Input.TextArea placeholder="Enter description" />
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    );
}

export default AddRoomModal;