import React, { useState, useEffect } from 'react';

interface Props {
    initialMinutes: number;
    handleFinishLate: Function;
    isRunning: boolean;
}

const CountdownTimer: React.FC<Props> = ({ initialMinutes, handleFinishLate, isRunning }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let countdownInterval: NodeJS.Timeout;

        if (isRunning) {
            countdownInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1); // Sử dụng functional update để tránh lỗi
                } else {
                    if (minutes === 0) {
                        clearInterval(countdownInterval);
                        handleFinishLate();
                    } else {
                        setMinutes(prevMinutes => prevMinutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
        } else {
            clearInterval(countdownInterval);
        }

        return () => clearInterval(countdownInterval);
    }, [minutes, seconds, isRunning]);

    return (
        <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
    );
};

export default CountdownTimer;
