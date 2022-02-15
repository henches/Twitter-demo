import { Divider, List } from 'antd';
import * as React from 'react';
import * as backendService from './backendService';
import TweetDTO from './DTO/TweetDTO';
import TweetsContainerDTO from './DTO/TweetsContainerDTO';
import UsersContainerDTO from './DTO/UsersContainerDTO';
import TweetTest from './Tweet';
import TweetUID from './UID/TweetUID';

export default function Timeline() {
    const [tweetsContainer, setTweetsContainer] = React.useState<TweetsContainerDTO>();
    const [usersContainer, setUsersContainer] = React.useState<UsersContainerDTO>();
    const [referencedTweetsContainer, setReferencedTweetsContainer] = React.useState<TweetsContainerDTO>();
    const [referencedUsersContainer, setReferencedUsersContainer] = React.useState<UsersContainerDTO>();
    const [uidTweets, setUidTweets] = React.useState<TweetUID[]>();
    const [isDataLoaded, setIsDataLoaded] = React.useState<boolean>(false);


    React.useEffect(() => { 
        setIsDataLoaded(false);
        backendService.getHomeTimeline() // get home timeline tweet Ids
        .then(miniTweets => {
            const tweetIds = miniTweets.map(miniTweet => miniTweet.id_str);
            return backendService.getTweets(tweetIds) // get tweets with tweet ids
        })
        .then(myTweetContainer => {
            setTweetsContainer(myTweetContainer);
            if (myTweetContainer) {
                const authorIds = myTweetContainer.includes.users.map(user => user.id); // TODO : en faire un ensemble unique ?
                const usersPromise: Promise<UsersContainerDTO> = backendService.getUsers(authorIds); // get related users

                const referencedTweetIds: string[] = [];
                myTweetContainer.data.forEach(tweet => {
                    if (tweet.referenced_tweets) {
                        referencedTweetIds.push(tweet.referenced_tweets[0].id)
                    };
                });
                const referencedTweetsPromise: Promise<TweetsContainerDTO> = backendService.getTweets(referencedTweetIds); // get re-tweets
                return Promise.all([usersPromise, referencedTweetsPromise]);
            }
        })
        .then(values => {
            const [usersContainer, referencedTweetsContainer] = values!;
            setUsersContainer(usersContainer);
            setReferencedTweetsContainer(referencedTweetsContainer);
            const authorIds = referencedTweetsContainer.includes.users.map(user => user.id); // get re-users
            return backendService.getUsers(authorIds)
        })
        .then(referenceUsersContainer => {
            setReferencedUsersContainer(referenceUsersContainer);
            setIsDataLoaded(true);
        })
        .catch(error => {
            console.log(error)
        });
    }, []);

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

    
    React.useEffect(() => {
        if (!isDataLoaded) {
            return;
        }
        const myUidTweets =  tweetsContainer?.data.map(tweet => {
            let referencedUidTweet: TweetUID | undefined = undefined;
            const firstPhotoUrl = getFirstPhoto(tweet, tweetsContainer);
            const user = usersContainer?.data.find(user => user.id === tweet.author_id);
            if (!user) {
                throw Error(`ERROR : no user found for tweetId '${tweet.id}'`);
            }
            if (tweet.referenced_tweets && tweet.referenced_tweets[0] && tweet.referenced_tweets[0].type === 'retweeted' ) {
                const referencedTweet = referencedTweetsContainer!.data.find(referencedTweet => referencedTweet.id === tweet.referenced_tweets[0].id);
                const referencedUser = referencedUsersContainer!.data.find(referencedUser => referencedUser.id === referencedTweet?.author_id)!;
                referencedUidTweet = {
                    tweet: {...referencedTweet!},
                    firstPhotoUrl: getFirstPhoto(referencedTweet!, referencedTweetsContainer!),
                    user: {...referencedUser}
                }
            }
            return {
                tweet: {...tweet},
                firstPhotoUrl: firstPhotoUrl,
                referencedUidTweet: referencedUidTweet,
                user: {...user}
            }
        });
        setUidTweets(myUidTweets);


    }, [isDataLoaded, tweetsContainer, usersContainer, referencedTweetsContainer, referencedUsersContainer] );

    return (
        <List className="timeline"
            itemLayout="vertical"
            bordered
            dataSource={uidTweets}                
            renderItem={
                uidTweet => 
                    <>
                        <TweetTest tweet={uidTweet}/>
                        <Divider/>
                    </> 
            }
        />
    );
}
