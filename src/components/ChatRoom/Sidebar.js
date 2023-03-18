import {Row, Col} from 'antd'
import RoomList from './RoomList';
import UserInfo from './UserInfo';
import styled from 'styled-components'


const SidebarStyled = styled.div`
    background: #999;
    color: white;
    height: 100vh;
`;

function Sidebar() {
    return ( 
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInfo/>
                </Col>
                <Col span={24}>
                    <RoomList/>
                </Col>
            </Row>
        </SidebarStyled>
    );
}

export default Sidebar;