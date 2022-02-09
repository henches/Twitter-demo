import { List } from 'antd';
import * as React from 'react';
import MiniTweetDTO from './DTO/MiniTeetDTO';
import TweetsContainerDTO from './DTO/TweetsContainerDTO';
import UsersContainerDTO from './DTO/UserContainerDTO';
import TweetTest from './TweetTest';
import TweetUID from './UID/TweetUID';
import * as serviceV1 from './twitterServiceV1'
import * as serviceV2 from './twitterServiceV2'

export default function Timeline() {
    const [timelineTweets, setTimelineTweets] = React.useState<MiniTweetDTO[]>();
    const [tweetsContainer, setTweetsContainer] = React.useState<TweetsContainerDTO>();
    const [usersContainer, setUsersContainer] = React.useState<UsersContainerDTO>();

    React.useEffect(() => {
        serviceV1.getHomeTimeline()
            .then(setTimelineTweets)
            .catch(error => {
                console.log(error)
            });
    }, []);
    
    React.useEffect(() => {
        if (timelineTweets) {
            const tweetIds = timelineTweets.map(miniTweet => miniTweet.id_str);
            serviceV2.getTweets(tweetIds)
                .then(setTweetsContainer)
                .catch(error => {
                    console.log(error)
            });
        }
    }, [timelineTweets]);

    React.useEffect(() => {
        if (tweetsContainer) {
            const authorIds = tweetsContainer.data.map(tweet => tweet.author_id);
            serviceV2.getUsers(authorIds)
                .then(setUsersContainer)
                .catch(error => {
                    console.log(error)
            });
        }
    }, [tweetsContainer]);

    const uidTweets: TweetUID[] = React.useMemo(() => {
        if (!tweetsContainer || !usersContainer) {
            return [];
        }   
        return tweetsContainer.data.map(tweet => {
            let firstPhotoUrl;
            const firstMediaKey = tweet.attachments?.media_keys[0];
            if (firstMediaKey) {
                const medias = tweetsContainer.includes.media;
                const theMedia = medias.find(oneMedia => oneMedia.media_key === firstMediaKey);
                firstPhotoUrl = theMedia?.url;  
            }
            const user = usersContainer.data.find(user => user.id === tweet.author_id);
            if (!user) {
                throw Error(`ERROR : no user found for tweetId '${tweet.id}'`);
            }
            return {
                id: tweet.id,
                text: tweet.text,
                firstPhotoUrl: firstPhotoUrl,
                user: {...user}
            }
        });
    }, [tweetsContainer, usersContainer])
    
    console.log('timelineTweets = ', uidTweets);
    
    return (
        <>
            COUCOOU
            <List 
                itemLayout="vertical"
                bordered
                dataSource={uidTweets}                
                renderItem={
                    uidTweet => <TweetTest tweet={uidTweet}/> 
                }
            />
        </>
    );
}
