import TweetDTO from "../DTO/TweetDTO";
import UserDTO from "../DTO/UserDTO";

type TweetUIO = {
    tweet: TweetDTO,
    firstPhotoUrl?: string
    user: UserDTO,
    referencedUioTweet?: TweetUIO
};

export default TweetUIO;
