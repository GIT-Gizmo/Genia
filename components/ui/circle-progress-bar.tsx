import React from "react";

interface CircleProgressBarProps {
    value: number;        // value of the progress (between 0 to 5)
    max?: number;         // max value, defaults to 5
    size?: number;        // size of the circle, defaults to 100
    strokeWidth?: number; // width of the stroke, defaults to 8
    textColor?: string;   // color of the text, defaults to #333
}

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
    value,
    max = 5,
    size = 100,
    strokeWidth = 8,
    textColor = "#333",   // default text color
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / max) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#eaeaea" // Background circle color
                strokeWidth={strokeWidth}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#a020f0" // Progress color
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.35s" }}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize={size / 3.5}
                fill={textColor}   // Use the textColor prop here
            >
                {value}/{max}
            </text>
        </svg>
    );
};

export default CircleProgressBar;
