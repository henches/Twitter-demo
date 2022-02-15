import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { List } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import * as React from 'react';
import IconText from './IconText';
import TweetUID from './UID/TweetUID';


export type TweetProps = {
    tweet: TweetUID;
}

export default function Tweet(props: TweetProps) {
    //console.log('props.tweet = ', props.tweet, ' props.tweet.id = ', props.tweet.id, ' props.tweet.userName = ', props.tweet.user.name);
    return (
        <List.Item
            key={props.tweet.id}
            actions={[
                <IconText icon={<StarOutlined/>} text="156" key="list-vertical-star-o" />,
                <IconText icon={<LikeOutlined/>} text="156" key="list-vertical-like-o" />,
                <IconText icon={<MessageOutlined/>} text="2" key="list-vertical-message" />,
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar shape='circle' src={props.tweet.user.profile_image_url} />} 
                title={props.tweet.user.username}
            />
            {props.tweet.text}
            {props.tweet.firstPhotoUrl && <img
                    width={272}
                    alt="logo"
                    src={props.tweet.firstPhotoUrl}
                />
            }
        </List.Item>
    )                    
}
