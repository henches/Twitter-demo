import { HeartOutlined, MessageOutlined, RetweetOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Row, Space } from 'antd';
import * as React from 'react';
import twttr from 'twitter-text';
import TweetUIO from './UIO/TweetUIO';

export type TweetProps = {
    uioTweet: TweetUIO
}

export default function Tweet(props: TweetProps) {
    let originalUioTweet = props.uioTweet, retweetingUioTweet = null;
    if (props.uioTweet.referencedUioTweet) {
        originalUioTweet = props.uioTweet.referencedUioTweet;
        retweetingUioTweet = props.uioTweet;
    }
    return (
        <div className="tweet">
            {retweetingUioTweet && <Row>
                <Col span={4}>
                    <Row justify="end" align="middle" className="retweet-icon">
                        <RetweetOutlined/>
                    </Row>
                </Col>
                <Col span={20}>
                    <Row justify="start" align="middle" className="retweet-text">
                        {retweetingUioTweet.user.name} a retweeté 
                    </Row>
                </Col>
            </Row>}
            <Row>
                <Col span={4}>
                    <Row justify="center">
                        <img alt="avatar" src={originalUioTweet.user.profile_image_url} className="sider-menu-item"/>
                    </Row>
                </Col>
                <Col span={20}>
                    <Row justify="space-between">
                        <div className="horizontal" >
                            <div className="name">{originalUioTweet.user.name}</div>
                            <div className="username">@{originalUioTweet.user.username}</div>
                        </div>
                        <div className="since">3h</div>    
                    </Row>
                    <Row>
                        {/* <div className="text">
                            <div dangerouslySetInnerHTML={{ 
                                __html: twttr.autoLink(originalUioTweet.tweet.text, {
                                            invisibleTagAttrs: "style='font-size:0'",
                                            urlEntities: originalUioTweet.tweet.entities
                                        })
                                }}>
                            </div>    
                        </div> */}
                        <div className="text">
                            <div dangerouslySetInnerHTML={{ 
                                    __html: twttr.autoLink(originalUioTweet.tweet.text, originalUioTweet.tweet.entities)
                                }}>
                            </div>    
                        </div>
                    </Row>
                    <Row>
                        {originalUioTweet.firstPhotoUrl && <img alt="fuck" src={originalUioTweet.firstPhotoUrl} className="photo"/>}
                    </Row>
                    <Row>
                        <Space size={20}>
                            <Space>
                                <MessageOutlined/> 
                                <div className="votes">{originalUioTweet.tweet.public_metrics.reply_count}</div>
                            </Space>
                            <Space>
                                <RetweetOutlined/> 
                                <div className="votes">{originalUioTweet.tweet.public_metrics.retweet_count + originalUioTweet.tweet.public_metrics.quote_count}</div>
                            </Space>
                            <Space>     
                                <HeartOutlined/> 
                                <div className="votes">{originalUioTweet.tweet.public_metrics.like_count}</div>
                            </Space>
                            <Space>     
                                <UploadOutlined/> 
                            </Space>
                        </Space>
                    </Row>
                </Col>
            </Row>
        </div>
    )                    
}
