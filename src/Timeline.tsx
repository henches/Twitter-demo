import { List } from 'antd';
import * as React from 'react';
import * as backendService from './backendService';
import MiniTweetDTO from './DTO/MiniTeetDTO';
import TweetDTO from './DTO/TweetDTO';
import TweetsContainerDTO from './DTO/TweetsContainerDTO';
import UsersContainerDTO from './DTO/UserContainerDTO';
import TweetTest from './TweetTest';
import TweetUID from './UID/TweetUID';

export default function Timeline() {
    const [timelineTweets, setTimelineTweets] = React.useState<MiniTweetDTO[]>();
    const [tweetsContainer, setTweetsContainer] = React.useState<TweetsContainerDTO>();
    const [usersContainer, setUsersContainer] = React.useState<UsersContainerDTO>();
    const [referencedTweetsContainer, setReferencedTweetsContainer] = React.useState<TweetsContainerDTO>();
    const [referencedUsersContainer, setReferencedUsersContainer] = React.useState<UsersContainerDTO>();


    React.useEffect(() => { // get home timeline tweet Ids
        backendService.getHomeTimeline()
            .then(setTimelineTweets)
            .catch(error => {
                console.log(error)
            });
    }, []);
    
    React.useEffect(() => { // get timeline tweets 
        if (timelineTweets) {
            const tweetIds = timelineTweets.map(miniTweet => miniTweet.id_str);
            backendService.getTweets(tweetIds)
                .then(myTweetContainer => {
                    console.log("myTweetContainer = ", myTweetContainer);
                    setTweetsContainer(myTweetContainer);
                })    
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

    React.useEffect(() => { // get re-tweets
        if (tweetsContainer) {
            const referencedTweetIds: string[] = [];
            tweetsContainer.data.forEach(tweet => {
                if (tweet.referenced_tweets) {
                    referencedTweetIds.push(tweet.referenced_tweets[0].id)
                };
            });
            //console.log('============== referencedTweetIds = ', referencedTweetIds);
            backendService.getTweets(referencedTweetIds)
                .then(referencedTweetsContainer => {
                    //console.log('=================== Referenced tweetsContainer = ', referencedTweetsContainer)
                    setReferencedTweetsContainer(referencedTweetsContainer)
                })
                .catch(error => {
                    console.log(error)
            });
        }
    }, [tweetsContainer]);

    React.useEffect(() => { // get re-tweets related users
        if (referencedTweetsContainer) {
            const authorIds = referencedTweetsContainer.includes.users.map(user => user.id);
            backendService.getUsers(authorIds)
                .then(setReferencedUsersContainer)
                .catch(error => {
                    console.log(error)
            });
        }
    }, [referencedTweetsContainer]);

    function getFirstPhoto(tweet: TweetDTO, tweetsContainer: TweetsContainerDTO) {
        if (!tweet.attachments) {
            return undefined
        }

        const firstMediaKey = tweet.attachments?.media_keys[0];

        if (!firstMediaKey) {
            return undefined;
        } 
        const medias = tweetsContainer.includes.media;
        const theMedia = medias.find(oneMedia => oneMedia.media_key === firstMediaKey);
        return theMedia?.url;  
    }

    const uidTweets: TweetUID[] = React.useMemo(() => {
        if (!tweetsContainer || !usersContainer || !referencedTweetsContainer || !referencedUsersContainer) {
            return [];
        }   
        console.log(`Construction de la liste des uidTweets tweetsContainer = ${tweetsContainer}, userContainer= ${usersContainer}, referencedTweetsContainer= ${referencedTweetsContainer}, referencedUsersContainer = ${referencedUsersContainer}`);
        return tweetsContainer.data.map(tweet => {
            console.log('tweet = ', tweet);
            let referencedUidTweet: TweetUID | undefined = undefined;
            const firstPhotoUrl = getFirstPhoto(tweet, tweetsContainer);
            const user = usersContainer.data.find(user => user.id === tweet.author_id);
            if (!user) {
                throw Error(`ERROR : no user found for tweetId '${tweet.id}'`);
            }
            if (tweet.referenced_tweets && tweet.referenced_tweets[0] && tweet.referenced_tweets[0].type === 'retweeted' ) {
                const referencedTweet = referencedTweetsContainer!.data.find(referencedTweet => referencedTweet.id === tweet.referenced_tweets[0].id);
                const referencedUser = referencedUsersContainer!.data.find(referencedUser => referencedUser.id === referencedTweet?.author_id)!;
                referencedUidTweet = {
                    id: referencedTweet?.id!,
                    text: referencedTweet?.text!,
                    firstPhotoUrl: getFirstPhoto(referencedTweet!, referencedTweetsContainer!),
                    user: {
                        ...referencedUser
                    }
                }
            }
            return {
                id: tweet.id,
                text: tweet.text,
                firstPhotoUrl: firstPhotoUrl,
                referencedUidTweet: referencedUidTweet,
                user: {...user}
            }
        });
    }, [tweetsContainer, usersContainer, referencedTweetsContainer, referencedUsersContainer])
    
    console.log('uidTweets = ', uidTweets);
    
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
