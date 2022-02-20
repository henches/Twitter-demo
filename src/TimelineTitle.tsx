import { Space } from 'antd';
import * as React from 'react';

export type TimelineTitleProps = {
    title: string,
    icon: JSX.Element,
    username: string | undefined
}

export default function TimelineTitle(props: TimelineTitleProps) {
    return (
        <div className="timeline-title">
            <Space>
                <span className="timeline-title-icon">{props.icon}</span>
                <span className="timeline-title-title">{props.title}</span>
                <span className="timeline-title-unsername">@{props.username}</span>
            </Space>
        </div>
    )                    
}
