import { List } from 'antd';
import * as React from 'react';
import TimelineDTO from './DTO/TimelineDTO';
import * as service from './service';

export default function Timeline() {
    const [timeline, setTimeline] = React.useState<TimelineDTO>();

    React.useEffect(() => {
        service.getTimeline()
            .then(localTimeline => {
                console.log(localTimeline);
                setTimeline(localTimeline);
            })
            .catch(reason => {
                console.log(reason);
            });
    }, []);

    React.useEffect(() => {
        service.getTimeline()
            .then(localTimeline => {
                console.log(localTimeline);
                setTimeline(localTimeline);
            })
            .catch(reason => {
                console.log(reason);
            });
    }, [timeline]);

    return (
        <List
          itemLayout="vertical"
          dataSource={timeline?.data}
          renderItem={tweet => (
                <List.Item>
                    <List.Item.Meta
                      title={tweet.id}
                      description={tweet.text}
                    />
                </List.Item>
            )}
        />
    );
}
