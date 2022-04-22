import { SnackMessage } from './components/Global/SnackMessage';
import { MyStack } from './navigation/NavigationStack';
import { MyTabs } from './navigation/TabNavigation';

export default function App() {
  return (
    <>
      {/* <MyStack /> */}
      <MyTabs />
      <SnackMessage />
    </>
  );
}

