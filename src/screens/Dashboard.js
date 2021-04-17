import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import TextInputMain from './TextInput'
import Cal from './Calculator'
import Picker from './ImagePicker'
// import Not from './Notification'

const Notification = () => <Text>adas</Text>;;

const UploadImage = () => <Picker />;

const TextInput = () =><TextInputMain />;
const Calculator = () => <Cal />;
const Logout = () =>  <Button mode="outlined" onPress={logoutUser}>Logout</Button>
const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'notification',color : "#131723", title: 'Notification', icon: 'bell' },
    { key: 'uploadimage',color : "#191723", title: 'Upload Image', icon: 'image' },
    { key: 'testinput', color : "#1b1924",title: 'Text Input', icon: 'database' },
    { key: 'calculator',color : "#191723", title: 'Calculator', icon: 'calculator' },
    // { key: 'logout',color : "#191723", title: 'Logout', icon: 'logout' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    notification: Notification,
    uploadimage: UploadImage,
    testinput: TextInput,
    calculator: Calculator,
    logout: Logout,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;
