import TimelineDTO from './DTO/TimelineDTO';
import send from './send';

const userId = "27926912";
const url = `2/users/${userId}/tweets`;

export function getTimeline(): Promise<TimelineDTO> {
    return send(url, { method: 'GET' });
}    


export function getTweet() {
    return 2;
}
