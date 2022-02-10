import { List } from 'antd';
import * as React from 'react';
import MiniTweetDTO from './DTO/MiniTeetDTO';
import TweetsContainerDTO from './DTO/TweetsContainerDTO';
import UsersContainerDTO from './DTO/UserContainerDTO';
import TweetTest from './TweetTest';
import TweetUID from './UID/TweetUID';
import * as backendService from './backendService'

export default function Timeline() {
    const [timelineTweets, setTimelineTweets] = React.useState<MiniTweetDTO[]>();
    const [tweetsContainer, setTweetsContainer] = React.useState<TweetsContainerDTO>();
    const [usersContainer, setUsersContainer] = React.useState<UsersContainerDTO>();

    React.useEffect(() => { // get home timeline tweet Ids
        backendService.getHomeTimeline()
            .then(setTimelineTweets)
            .catch(error => {
                console.log(error)
            });
    }, []);
    
    React.useEffect(() => { // get related tweets with tweet ids
        if (timelineTweets) {
            const tweetIds = timelineTweets.map(miniTweet => miniTweet.id_str);
            backendService.getTweets(tweetIds)
                .then(setTweetsContainer)
                .catch(error => {
                    console.log(error)
            });
        }
    }, [timelineTweets]);

    React.useEffect(() => { // get related users
        if (tweetsContainer) {
            const authorIds = tweetsContainer.includes.users.map(user => user.id);
            backendService.getUsers(authorIds)
                .then(setUsersContainer)
                .catch(error => {
                    console.log(error)
            });
        }
    }, [tweetsContainer]);

        React.useEffect(() => { // get related tweets with tweet ids
        if (timelineTweets) {
            const tweetIds = timelineTweets.map(miniTweet => miniTweet.id_str);
            backendService.getTweets(tweetIds)
                .then(setTweetsContainer)
                .catch(error => {
                    console.log(error)
            });
        }
    }, [timelineTweets]);

    React.useEffect(() => { // get related users
        if (tweetsContainer) {
            const authorIds = tweetsContainer.includes.users.map(user => user.id);
            backendService.getUsers(authorIds)
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
