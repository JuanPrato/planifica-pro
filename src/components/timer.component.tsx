import { useEffect, useState } from 'react'

import "./timer.component.css";
import { formatTime } from '../util/time.util';
import { IonButton, IonIcon, IonToggle, useIonRouter } from '@ionic/react';
import { playOutline, refreshOutline } from 'ionicons/icons';
import { useTimer } from '../hooks/timer.hook';
import Confirmation from './confirmation.component';

interface TimerProps {
  initialData: { totalTime: number, timeUsed?: number }
  onStop?: (completed: boolean, timeUsed: number) => void;
}

const WORK_CIRCLE_TIME: number = 4;
const REST_CIRCLE_TIME: number = 2;

function getTotalTime(rests: boolean, initialTotalTime: number, working: boolean, cicles: number) {
  if (!rests) {
    return initialTotalTime;
  }

  if (working) {
    return Math.round(WORK_CIRCLE_TIME * (Math.min(1, cicles)));
  } else {
    return REST_CIRCLE_TIME;
  }
}

function getCurrentTime(rests: boolean, timeUsed?: number) {
  if (!rests) {
    return timeUsed || 0;
  }
  return 0;
}

function getCicles(rests: boolean, initialTotalTime: number, timeUsed?: number) {
  return rests ? ((initialTotalTime - (timeUsed ?? 0)) / WORK_CIRCLE_TIME) : 1;
}


const Timer = ({ initialData: { totalTime: initialTotalTime, timeUsed }, onStop }: TimerProps) => {

  const [rests, setRests] = useState(false);

  const [cicles, setCicles] = useState(1);
  const [working, setWorking] = useState(true);

  const [totalTimeAcc, setTotalTimeAcc] = useState(timeUsed ?? 0);

  const [restartModal, setRestartModal] = useState(false);

  const router = useIonRouter();

  function onTick() {
    if (working) {
      setTotalTimeAcc((t) => t + 1);
    }

    if (time >= totalTime) {
      play(false);
      if (working) {
        setCicles((c) => c - 1);
      } else {
        setWorking(false);
      }
    }
  }

  function onTimerStop() {
    onStop && onStop(cicles === 0, totalTimeAcc);
  }

  const { percentage, time, totalTime, running, play, resetValues } = useTimer({
    time: initialTotalTime,
    initialTime: timeUsed,
    onTick,
    onStop: onTimerStop
  });

  useEffect(() => {
    if (cicles === 0) {
      return;
    }

    resetValues(
      getCurrentTime(rests, timeUsed),
      getTotalTime(rests, initialTotalTime, working, cicles)
    );
  }, [cicles, working]);

  useEffect(() => {
    setCicles(getCicles(rests, initialTotalTime, time));
  }, [rests]);

  function restart() {
    setRestartModal(true);
  }

  function restartResult(ok: boolean) {
    setRestartModal(false);

    if (ok) {
      onStop && onStop(false, 0);
      router.goBack();
    }
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
              <h3>Ciclos restantes: {Math.ceil(cicles)}</h3>
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
        <IonButton color="success" onClick={() => play()}>
          <IonIcon slot='start' icon={playOutline} size='small' />
          {running ? "Pausar" : "Iniciar"}
        </IonButton>
        <IonButton color="warning" onClick={restart}>
          <IonIcon slot='start' icon={refreshOutline} size='small' />
          Reiniciar
        </IonButton>
      </div>
      <IonToggle labelPlacement='end' onIonChange={(v) => setRests(v.target.checked)}>Agregar descansos</IonToggle>
      <Confirmation
        onResult={restartResult}
        title='Seguro que desea reiniciar el tiempo de esta actividad?'
        message='Esta acción no puede deshacerse'
        isOpen={restartModal}
      />
    </>
  )
}

export default Timer;