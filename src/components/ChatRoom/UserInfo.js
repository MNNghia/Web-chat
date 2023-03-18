import { Typography, Button, Avatar } from "antd";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

const WrapperStyled = styled.div`
display: flex;
justify-content: space-between;
padding: 12px 16px;
border-bottom: 1px solid rgba(82, 38, 83);

.username {
    color: white;
    margin-left: 5px;
}
`

function UserInfo() {

    // useEffect(() => {
    //     db.collection('users').onSnapshot((snapshot)=> {
    //         const data = snapshot.docs.map(doc => ({
    //             ...doc.data(),
    //             id: doc.id
    //         }))
    //     })
    // }, [])

    const {
        displayName,
        photoURL
    } = useContext(AuthContext)


    return (
        <WrapperStyled>
            
                <div className="">
                    <Avatar src={photoURL}>{photoURL? '':displayName?.charAt(0)?.toUpperCase()}</Avatar>
                    <Typography.Text className="username">{displayName}</Typography.Text>
                </div>
                <Button ghost onClick={() => auth.signOut()}>Log out</Button>
            
        </WrapperStyled>
    );
}

export default UserInfo;