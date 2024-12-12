import { IonRouterOutlet } from '@ionic/react'
import React from 'react'
import { Route, RouteComponentProps } from 'react-router'
import DayPage from './DayPage'
import Calendar from './CalendarList'

const CalendarPage: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url}>
        <Calendar />
      </Route>
      <Route
        path={`${match.url}/day/:date`}
        render={props => <DayPage {...props} />} >
      </Route>
    </IonRouterOutlet>
  )
}

export default CalendarPage