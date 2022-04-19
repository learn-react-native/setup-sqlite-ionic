import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  // IonIcon,
  // IonLabel,
  IonRouterOutlet,
  // IonTabBar,
  // IonTabButton,
  // IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

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

/* Theme variables */
import './theme/variables.css';

/* Routes */
import User from './pages/user';
import UserDetail from './pages/user/detail';
import Home from './pages/home';
import Task from './pages/task';
import TaskDetail from './pages/task/detail';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Home} exact={true} />
          <Route path="/user" component={User} exact={true} />
          <Route path={'/user/:id'} component={UserDetail} exact={true} />
          <Route path="/task" component={Task} exact={true} />
          <Route path={'/task/:id'} component={TaskDetail} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
