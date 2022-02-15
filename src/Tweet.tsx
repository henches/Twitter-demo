import { HeartOutlined, MessageOutlined, RetweetOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Row, Space } from 'antd';
import * as React from 'react';
import twttr from 'twitter-text';
import TweetUID from './UID/TweetUID';

export type TweetProps = {
    tweet: TweetUID
}

export default function Tweet(props: TweetProps) {
    let originalTweet = props.tweet, retweeting = null;
    if (props.tweet.referencedUidTweet) {
        originalTweet = props.tweet.referencedUidTweet;
        retweeting = props.tweet;
    }
    
    return (
        <div className="tweet">
            {retweeting && <Row>
                <Col span={4}>
                    <Row justify="end" align="middle" className="retweet-icon">
                        <RetweetOutlined/>
                    </Row>
                </Col>
                <Col span={20}>
                    <Row justify="start" align="middle" className="retweet-text">
                        {retweeting.user.name} a retweeté 
                    </Row>
                </Col>
            </Row>}
            <Row>
                <Col span={4}>
                    <Row justify="center">
                        <img alt="avatar" src={originalTweet.user.profile_image_url} className="avatar"/>
                    </Row>
                </Col>
                <Col span={20}>
                    <Row justify="space-between">
                        <div className="horizontal" >
                            <div className="name">{originalTweet.user.name}</div>
                            <div className="username">@{originalTweet.user.username}</div>
                        </div>
                        <div className="since">3h</div>    
                    </Row>
                    <Row>
                        <div className="text">
                            <div dangerouslySetInnerHTML={{ __html: twttr.autoLink(originalTweet.tweet.text) }}/>
                        </div>
                    </Row>
                    <Row>
                        {originalTweet.firstPhotoUrl && <img alt="fuck" src={originalTweet.firstPhotoUrl} className="photo"/>}
                    </Row>
                    <Row>
                        <Space size={20}>
                            <Space>
                                <MessageOutlined/> 
                                <div className="votes">{originalTweet.tweet.public_metrics.reply_count}</div>
                            </Space>
                            <Space>
                                <RetweetOutlined/> 
                                <div className="votes">{originalTweet.tweet.public_metrics.retweet_count + originalTweet.tweet.public_metrics.quote_count}</div>
                            </Space>
                            <Space>     
                                <HeartOutlined/> 
                                <div className="votes">{originalTweet.tweet.public_metrics.like_count}</div>
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
