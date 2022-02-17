import TweetDTO from "../DTO/TweetDTO";
import UserDTO from "../DTO/UserDTO";

type TweetUID = {
    tweet: TweetDTO,
    firstPhotoUrl?: string
    user: UserDTO,
    referencedUidTweet?: TweetUID
};

export default TweetUID;
