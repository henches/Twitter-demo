import UserDTO from "../DTO/UserDTO";

type TweetUID = {
    id: string,
    text: string,
    firstPhotoUrl?: string
    user: UserDTO,
};

export default TweetUID;
