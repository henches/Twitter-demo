import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Col, Row, Space } from 'antd';
import * as React from 'react';
import TweetUID from './UID/TweetUID';



export type TweetProps = {
    tweet: TweetUID
}

export default function Tweet(props: TweetProps) {
    return (
        <Row>
            <Col span={4}>
                <Row justify="center">
                    <img alt="fuck" src={props.tweet.user.profile_image_url} className="avatar"/>
                </Row>
            </Col>
            <Col span={20}>
                <Row justify="space-between">
                    <div className="horizontal" >
                        <div className="name">{props.tweet.user.name}</div>
                        <div className="username">{props.tweet.user.username}</div>
                    </div>
                    <div className="since">3h</div>    
                </Row>
                <Row>
                    <div className="text">
                        {props.tweet.text}
                    </div>
                </Row>
                <Row>
                    "#toto #titi"
                </Row>    
                <Row>
                    {props.tweet.firstPhotoUrl && <img alt="fuck" src={props.tweet.firstPhotoUrl} className="photo"/>}
                </Row>
                <Row>
                    <Space size={20}>
                        <Space>
                            <StarOutlined/> 
                            <div className="votes">23</div>
                        </Space>
                        <Space>
                            <LikeOutlined/> 
                            <div className="votes">234</div>
                        </Space>
                        <Space>     
                            <MessageOutlined/> 
                            <div className="votes">2356</div>
                        </Space>
                    </Space>
                </Row>
            </Col>
        </Row>
    )                    
}
