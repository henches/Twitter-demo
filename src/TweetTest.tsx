import { LikeOutlined, MessageOutlined, RetweetOutlined, StarOutlined } from '@ant-design/icons';
import { Col, Row, Space } from 'antd';
import * as React from 'react';
import twttr from 'twitter-text';
import TweetUID from './UID/TweetUID';




export type TweetProps = {
    tweet: TweetUID
}

export default function Tweet(props: TweetProps) {
    let mainTweet = props.tweet, retweeting = null;
    if (props.tweet.referencedUidTweet) {
        mainTweet = props.tweet.referencedUidTweet;
        retweeting = props.tweet;
        console.log('retweeting = ', retweeting)
    }
    var usernames = twttr.extractMentions(mainTweet.text);
    console.log("text = ", mainTweet.text, " usernames = ", usernames);
    twttr.autoLink(mainTweet.text);
    
    return (
        <>
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
                        <img alt="avatar" src={mainTweet.user.profile_image_url} className="avatar"/>
                    </Row>
                </Col>
                <Col span={20}>
                    <Row justify="space-between">
                        <div className="horizontal" >
                            <div className="name">{mainTweet.user.name}</div>
                            <div className="username">{mainTweet.user.username}</div>
                        </div>
                        <div className="since">3h</div>    
                    </Row>
                    <Row>
                        <div className="text">
                            {twttr.autoLink(mainTweet.text)}
                        </div>
                    </Row>
                    <Row>
                        "#toto #titi"
                    </Row>    
                    <Row>
                        {mainTweet.firstPhotoUrl && <img alt="fuck" src={mainTweet.firstPhotoUrl} className="photo"/>}
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
        </>
    )                    
}
