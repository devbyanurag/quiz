import React, { useState, useEffect } from 'react';

interface TimerProps {
    initialTime: number;
    onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimerEnd }) => {
    const [time, setTime] = useState<number | null>(initialTime);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (time !== null && time > 0) {
            timerId = setInterval(() => {
                setTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
            }, 1000);
        } else if (time === 0) {
            onTimerEnd();
        }

        return () => clearInterval(timerId);
    }, [time, onTimerEnd]);

    return <p>{time !== null ? time : 'Time Up!'}</p>;
};

export default Timer;
