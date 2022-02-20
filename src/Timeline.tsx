import { Divider, List } from 'antd';
import * as React from 'react';
import * as backendService from './backendService';
import TweetDTO from './DTO/TweetDTO';
import TweetsContainerDTO from './DTO/TweetsContainerDTO';
import UsersContainerDTO from './DTO/UsersContainerDTO';
import TimelineTitle from './TimelineTitle';
import Tweet from './Tweet';
import TweetUIO from './UIO/TweetUIO';
import { raiseError } from './utils';

export type TimelineProps = {
    tweetsContainer: TweetsContainerDTO | undefined;
    title: string,
    icon: JSX.Element,
    username: string | undefined
}

export default function Timeline(props: TimelineProps) {
    const [usersContainer, setUsersContainer] = React.useState<UsersContainerDTO>();
    const [referencedTweetsContainer, setReferencedTweetsContainer] = React.useState<TweetsContainerDTO>();
    const [referencedUsersContainer, setReferencedUsersContainer] = React.useState<UsersContainerDTO>();
    const [uioTweets, setUioTweets] = React.useState<TweetUIO[]>();
    const [isDataLoaded, setIsDataLoaded] = React.useState<boolean>(false);

    React.useEffect(() => { 
        if (props.tweetsContainer) {
            setIsDataLoaded(false);

            const authorIds = props.tweetsContainer.includes.users.map(user => user.id); // TODO : en faire un ensemble unique ?
            const usersPromise: Promise<UsersContainerDTO> = backendService.getUsers(authorIds); // get related users

            const referencedTweetIds: string[] = [];
            props.tweetsContainer.data.forEach(tweet => {
                if (tweet.referenced_tweets) {
                    referencedTweetIds.push(tweet.referenced_tweets[0].id)
                };
            });
            const referencedTweetsPromise: Promise<TweetsContainerDTO> = backendService.getTweetsByIds(referencedTweetIds); // get re-tweets

            Promise.all([usersPromise, referencedTweetsPromise])
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
            .catch(raiseError)
        }
    }, [props.tweetsContainer]);

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
        const myUioTweets =  props.tweetsContainer?.data.map(tweet => {
            let referencedUioTweet: TweetUIO | undefined = undefined;
            const firstPhotoUrl = getFirstPhoto(tweet, props.tweetsContainer!);
            const user = usersContainer?.data.find(user => user.id === tweet.author_id);
            if (!user) {
                throw Error(`ERROR : no user found for tweetId '${tweet.id}'`);
            }
            if (tweet.referenced_tweets && tweet.referenced_tweets[0] && tweet.referenced_tweets[0].type === 'retweeted' ) {
                const referencedTweet = referencedTweetsContainer!.data.find(referencedTweet => referencedTweet.id === tweet.referenced_tweets[0].id);
                const referencedUser = referencedUsersContainer!.data.find(referencedUser => referencedUser.id === referencedTweet?.author_id)!;
                referencedUioTweet = {
                    tweet: {...referencedTweet!},
                    firstPhotoUrl: getFirstPhoto(referencedTweet!, referencedTweetsContainer!),
                    user: {...referencedUser}
                }
            }
            return {
                tweet: {...tweet},
                firstPhotoUrl: firstPhotoUrl,
                referencedUioTweet: referencedUioTweet,
                user: {...user}
            }
        });
        setUioTweets(myUioTweets);


    }, [isDataLoaded, props.tweetsContainer, usersContainer, referencedTweetsContainer, referencedUsersContainer]);

    return (
        <div className="timeline">
            <TimelineTitle title={props.title} icon={props.icon} username={props.username}/>
            <List className="timeline-content"
                itemLayout="vertical"
                bordered
                dataSource={uioTweets}                
                renderItem={
                    uioTweet => 
                        <>
                            <Tweet uioTweet={uioTweet}/>
                            <Divider/>
                        </> 
                }
            />
        </div>
    );
}
