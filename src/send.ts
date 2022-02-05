const URL_BACKEND = 'https://api.twitter.com';
const ATHORIZATION_BEARER = 'AAAAAAAAAAAAAAAAAAAAAGBIYwEAAAAA6AvEO4dJ72leB7w7vhYre17xuBw%3DAqdY09IjefHcuQ3B4oc2pbGqWfp4tLnRZimGYuoJ4ss4gwmyBK';
const API_KEY = 'Wz2RoXSfyO5tCgzSMyyh4GtXr"';
const API_KEY_SECRET = 'Z75yjvRYj2q23y56iEJbkkiQ38WKc8mspE2LJ4wq808dZWVoLt';
const ACCESS_TOKEN = '27926912-lUV73OvT7tPytqnksiPa1szg48WnZZsVxqRm0KYXD';
const ACCESS_TOKEN_SECRET = '0f0aEaQXGpc6l0dIqCFAGbSDZ28dD6w8TJYfchNyTDwxz';

//header 'authorization: OAuth oauth_consumer_key="CONSUMER_API_KEY", oauth_nonce="OAUTH_NONCE", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token="ACCESS_TOKEN", oauth_version="1.0"' \

// Authorization: `Bearer ${ATHORIZATION_BEARER}`,
// consumer_key: API_KEY, // from Twitter.
// consumer_secret: API_KEY_SECRET, // from Twitter.
// access_token_key: ACCESS_TOKEN, // from your User (oauth_token)
// access_token_secret: ACCESS_TOKEN_SECRET // from your User (oauth_token_secret)

export default function send<T>(path: string, options: RequestInit): Promise<T> {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ATHORIZATION_BEARER}`,
        }
    };

    const url = `${URL_BACKEND}/${path}`;
    const theOptions = { ...defaultOptions, ...options };
    return fetch(url, theOptions)
        .then((response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            if (response.headers.get('content-type')!.split(';')[0] === 'application/json') {
                return response.json();
            }
            return Promise.reject(new Error('Bad content type'));
        }));
}
