import TwitterLite from 'twitter-lite';
import keys from './config.json';
import MiniTweetDTO from './DTO/MiniTeetDTO';
import TweetsContainerDTO from './DTO/TweetsContainerDTO';
import UserContainerDTO from './DTO/UserContainerDTO';
import UsersContainerDTO from './DTO/UsersContainerDTO';

const clientV1 = new TwitterLite({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  ...keys
});

const clientV2 = new TwitterLite({
  extension: false,
  version: "2",
  ...keys
});

export function getHomeTimeline(): Promise<MiniTweetDTO[]> {
  return clientV1.get('statuses/home_timeline');
}

export function getUserTweets(userId: string): Promise<TweetsContainerDTO> {
  return clientV2.get(`users/${userId}/tweets`, {
    "expansions": "attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields": "author_id,conversation_id,public_metrics,entities",
    "media.fields": "height,media_key,preview_image_url,type,url,width,alt_text"
  });
}

export function getUserMentionsTweets(userId: string): Promise<TweetsContainerDTO> {
  return clientV2.get(`users/${userId}/tweets`, {
    "expansions": "attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields": "author_id,conversation_id,public_metrics,entities",
    "media.fields": "height,media_key,preview_image_url,type,url,width,alt_text"
  });
}

export function getTweetsByIds(tweetIds: string[]): Promise<TweetsContainerDTO> {
  return clientV2.get('tweets', {
    "ids": tweetIds.join(','),
    "expansions": "attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields": "author_id,conversation_id,public_metrics,entities",
    "media.fields": "height,media_key,preview_image_url,type,url,width,alt_text"
  });
}

export function getUsers(userIds: string[]): Promise<UsersContainerDTO> {
  return clientV2.get('users', {
    "ids": userIds.join(','),
    "user.fields": "profile_image_url"
  });
}

export function getMe(): Promise<UserContainerDTO> {
  return clientV2.get('users/me', {
    "user.fields": "profile_image_url"
  });
}
