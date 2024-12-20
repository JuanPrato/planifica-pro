import React, { useEffect, useState } from 'react'

import "./timer.component.css";
import { formatTime } from '../util/time.util';
import { Activity } from '../types';
import { IonButton, IonIcon, IonToggle } from '@ionic/react';
import { time, playOutline, refreshOutline } from 'ionicons/icons';

interface TimerProps {
  initialData: { totalTime: number, timeUsed?: number }
  onStop?: () => void;
}

const WORK_CIRCLE_TIME: number = 4;
const REST_CIRCLE_TIME: number = 2;

const Timer = ({ initialData: { totalTime: initialTotalTime, timeUsed }, onStop }: TimerProps) => {

  const [percentage, setPercentage] = useState(0);
  const [running, setRunning] = useState(false);

  const [time, setTime] = useState((timeUsed || 0));
  const [totalTime, setTotalTime] = useState(initialTotalTime);
  const [rests, setRests] = useState(false);

  const [cicles, setCicles] = useState(1);
  const [working, setWorking] = useState(true);

  useEffect(() => {
    if (cicles === 0) {
      onStop && onStop();
      return;
    }
    if (!rests) {
      return;
    }
    setTime(0);
    if (working) {
      setWorking(false);
      setTotalTime(REST_CIRCLE_TIME);
    } else {
      setWorking(true);
      setTotalTime(WORK_CIRCLE_TIME);
    }
  }, [cicles]);

  useEffect(() => {
    if (rests) {
      const cicles = (initialTotalTime - (timeUsed ?? 0)) / WORK_CIRCLE_TIME;
      setWorking(false);
      setCicles(cicles * 2);
    } else {
      setTime(timeUsed || 0);
      setTotalTime(initialTotalTime);
      setCicles(1);
    }
  }, [rests]);

  useEffect(() => {
    setPercentage(((time || 0) * 100) / totalTime);
    if (time >= totalTime) {
      setRunning(false);
      setCicles(c => c - 1);
    }
  }, [time, totalTime]);

  useEffect(() => {
    if (!running) {
      onStop && onStop();
      return;
    }
    const loop = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    return () => clearInterval(loop);
  }, [running]);

  function play() {
    setRunning(!running);
  }

  return (
    <>
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
            className={'progress-circle' + " " + ((rests && !working) ? "on-rest" : "")}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <span className='time-text'>{formatTime(totalTime - time)}</span>
          {
            rests ? (
              <h3>Ciclos restantes: {Math.ceil(cicles / 2)}</h3>
            ) : (
              <h3 className=''>Total: {formatTime(totalTime)}</h3>
            )
          }
          {
            rests && (<h4>{working ? "Trabajando..." : "Descansado..."}</h4>)
          }
        </div>
      </div>
      <div>
        <IonButton color="success" onClick={play}>
          <IonIcon slot='start' icon={playOutline} size='small' />
          {running ? "Pausar" : "Iniciar"}
        </IonButton>
        <IonButton color="warning">
          <IonIcon slot='start' icon={refreshOutline} size='small' />
          Reiniciar
        </IonButton>
      </div>
      <IonToggle labelPlacement='end' onIonChange={(v) => setRests(v.target.checked)}>Agregar descansos</IonToggle>
    </>
  )
}

export default Timer;