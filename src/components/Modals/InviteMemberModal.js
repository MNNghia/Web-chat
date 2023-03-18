import { Form, Select, Modal, Spin, Avatar } from 'antd'
import { debounce } from 'lodash';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { db } from '../../firebase/config';



function DebounceSelect({fetchOptions, debounceTimeout = 300, curMembers, ...props }) {


    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(()=> {
        const loadOptions =(value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false)
            })
        }

        return debounce(loadOptions, debounceTimeout);
    },[debounceTimeout, fetchOptions])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
        >
            {
                options.map(opt => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size="small" src={opt.photoURL}>
                            {
                                opt.photoURL ? '' : opt.displayName?.charAt(0)?.toUpperCase()
                            }
                        </Avatar>
                        {
                            `${opt.label}`
                        }
                    </Select.Option>
                ))
            }
        </Select>
    )
}

async function fetchUserList(search, curMembers) {
    return db.collection('users').where('keywords', 'array-contains', search).orderBy('displayname').limit(20).get()
    .then(snapshot => {
        return snapshot.docs.map(doc => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL

        })).filter(opt => curMembers.includes(opt.value))
    })
}

function InviteMemberModal() {

    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = useContext(AppContext)
    const [form] = Form.useForm();
    const [value, setValue] = useState([])
    

    const handleOk = () => {

        //rest form value
        form.resetFields()

        const roomRef = db.collection('rooms').doc(selectedRoomId)

        roomRef.update({
            members:[...selectedRoom.members, ...value.map(val=> val.value)]
        })

        setIsInviteMemberVisible(false);
    }

    const handleCancel = () => {
        //rest form value
        form.resetFields()

        //update members in current room
        
        setIsInviteMemberVisible(false);
    }

    return (
        <div>
            <Modal
                title="Add Member"
                open={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                    mode="multiple"
                    name="search-user"
                    label="Name of Members"
                    value={value}
                    placeholder="Enter Name of Member"
                    fetchOptions={fetchUserList}
                    onChange={newValue => setValue(newValue)}
                    style={{width: '100%'}}
                    curMembers={selectedRoom.members}
                    />
                </Form>

            </Modal>
        </div>
    );
}

export default InviteMemberModal;