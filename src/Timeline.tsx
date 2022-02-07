import { List } from 'antd';
import * as React from 'react';
import TimelineDTO from './DTO/TimelineDTO';
//import * as twitService from './service';
import * as service from './twitterLightService';

export default function Timeline() {
    const [timeline, setTimeline] = React.useState<TimelineDTO>();


    // React.useEffect(() => {
    //     service.getTimeline()
    //         .then(localTimeline => {
    //             console.log(localTimeline);
                
    //             setTimeline(localTimeline);
    //         })
    //         .catch(reason => {
    //             console.log(reason);
    //         });
    //     twitterLightService.getBananas()    
    // }, []);

    React.useEffect(() => {
        service.getBananas();
    }, [timeline]);

    return (
        <>
            COUCOOU
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
        </>
    );
}
