import AttachmentsDTO from "./AttachmentsDTO";

type TweetDTO = {
    id: string,
    text: string,
    attachments: AttachmentsDTO,
    author_id: string
};

export default TweetDTO;
