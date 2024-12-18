import React, { useEffect, useState } from 'react'

import "./timer.component.css";
import { formatTime } from '../util/time.util';
import { Activity } from '../types';

interface TimerProps {
  activity: Activity;
}

const Timer = ({ activity: { time, timeUsed } }: TimerProps) => {

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(((timeUsed || 0) * 100) / time);
  }, []);

  return (
    <div className='container'>
      <svg viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="4"
          className='inner-circle'
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="4"
          strokeDasharray={`${283 * percentage / 100} 283`}
          strokeLinecap="round"
          className='progress-circle'
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <span className='time-text'>{formatTime((time - (timeUsed || 0)) * 60)}</span>
        <h3 className=''>Total: {formatTime(time * 60)}</h3>
        <h4>Descansos: {formatTime(60)}</h4>
      </div>
    </div>
  )
}

export default Timer;