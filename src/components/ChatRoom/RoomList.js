import { Collapse, Typography } from "antd";
import styled from "styled-components";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import useFirestore from "../../hooks/useFirestore";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse

const PanelStyle = styled(Panel)`
 &&&{
    .ant-collapse-header, p {
        color: white
    }

    .ant-collapse-content-box {
        padding: 0 40px;
    }

    .add-room {
        color: white;
        padding: 0;
    }
 }
`
const LinkStyled = styled(Typography.Link)`
 display: block;
 marign-bottom: 5px;
 color: white;
`

function RoomList() {

    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext)

    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyle header="Danh sach cac phong" key="1">
                {
                    rooms.map(room =>
                        <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)} >
                            {room.name}
                        </LinkStyled>)
                }
                <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={handleAddRoom}>Add Room</Button>
            </PanelStyle>
        </Collapse>
    );
}

export default RoomList;