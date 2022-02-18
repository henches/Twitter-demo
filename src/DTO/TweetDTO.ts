import AttachmentsDTO from "./AttachmentsDTO";
import MetricsDTO from "./MetricsDTO";
import ReferencedTweetDTO from "./ReferencedTweetDTO";

type TweetDTO = {
    id: string,
    text: string,
    attachments: AttachmentsDTO,
    author_id: string,
    referenced_tweets: ReferencedTweetDTO[],
    public_metrics: MetricsDTO,
    entities: any
};

export default TweetDTO;
