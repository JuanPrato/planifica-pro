import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { settingsOutline, flashOutline, calendarOutline } from 'ionicons/icons';

import CalendarPage from './pages/calendar.page';
import QuickTaskPage from './pages/quick-task.page';
import ProfilePage from './pages/profile.page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_yltG9foB1zU1v_I_d3kmIGWqSHfTQig",
  authDomain: "planifica-pro.firebaseapp.com",
  projectId: "planifica-pro",
  storageBucket: "planifica-pro.firebasestorage.app",
  messagingSenderId: "321824242190",
  appId: "1:321824242190:web:70c34279f8a4517c789a5f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/calendar"
              render={props => <CalendarPage {...props} />}
            />
            <Route exact path="/quick-task">
              <QuickTaskPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/">
              <Redirect to="/calendar" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" color="secondary">
            <IonTabButton tab="calendar" href="/calendar">
              <IonIcon aria-hidden="true" icon={calendarOutline} />
              <IonLabel>Calendario</IonLabel>
            </IonTabButton>
            <IonTabButton tab="quick-task" href="/quick-task">
              <IonIcon aria-hidden="true" icon={flashOutline} />
              <IonLabel>Tarea rápida</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon aria-hidden="true" icon={settingsOutline} />
              <IonLabel>Configuración</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
