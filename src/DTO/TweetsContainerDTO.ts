import IncludesDTO from "./IncludesDTO";
import TweetDTO from "./TweetDTO";

type TweetsContainerDTO = {
    data: TweetDTO[],
    includes: IncludesDTO,
};

export default TweetsContainerDTO;
