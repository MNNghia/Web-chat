import React from 'react'
import {Row, Col, Button, Typography} from 'antd'
import firebase, {auth, db} from '../../firebase/config.js'
import { addDocument, generateKeywords } from '../../firebase/services.js'

const{Title} = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider()

function Login() {

    
    const handleFbLogin = async() => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(fbProvider);
        
        if( additionalUserInfo?.isNewUser) {
            addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            } )
        }
    }
    

    return ( 
        <div className="">
            <Row justify="center" style={{height: 800}}>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}} level={3}>Fun Chat</Title>
                    <Button style={{width: '100%', marginBottom: 5}}>
                        Login Google
                    </Button>
                    <Button style={{width: '100%'}}
                        onClick={handleFbLogin}
                    >
                        Login Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;