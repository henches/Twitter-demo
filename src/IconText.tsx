import { Space } from "antd";
import React from "react";
import { ReactNode } from "react";

export type IconTextProps = {
    icon: ReactNode;
    text: string
}

export default function Tweet(props: IconTextProps) {
    return (
        <Space>
           {props.icon}
           {props.text}
        </Space>
    )                    
}
