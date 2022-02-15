import AttachmentsDTO from "./AttachmentsDTO";
import ReferencedTweetDTO from "./ReferencedTweetDTO";

type TweetDTO = {
    id: string,
    text: string,
    attachments: AttachmentsDTO,
    author_id: string,
    referenced_tweets: ReferencedTweetDTO[]
};

export default TweetDTO;
