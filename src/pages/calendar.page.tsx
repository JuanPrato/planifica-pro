import { IonPage, IonRouterOutlet } from '@ionic/react'
import React from 'react'
import { Route, RouteComponentProps } from 'react-router'
import DayPage from './day.page'
import Calendar from './calendar-list.page'
import ActivityPage from './activity.page'

const CalendarPage: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path={match.url}>
          <Calendar />
        </Route>
        <Route
          exact
          path={`${match.url}/day/:date`}
          render={props => <DayPage {...props} />} >
        </Route>
        <Route
          path={`${match.url}/day/:date/activity/:activityId`}
          render={(props) => <ActivityPage {...props} />}
        >
        </Route>
      </IonRouterOutlet>
    </IonPage>
  )
}

export default CalendarPage