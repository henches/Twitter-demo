import TimelineDataDTO from './TimelineDataDTO';
import TimelineMetaDTO from './TimelineMetaDTO';

type TimelineDTO = {
    data: TimelineDataDTO[],
    meta: TimelineMetaDTO[]
};

export default TimelineDTO;
