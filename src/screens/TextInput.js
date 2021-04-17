import React, {useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,TouchableOpacity,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import {db} from '../core/config';
import TextInput from '../components/TextInput'
import { heightToDp, widthToDp } from '../helpers/dim'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: '',
    };

    this.addNewTodo = this.addNewTodo.bind(this);
  }

  componentDidMount() {
    db.ref('/todos').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let todoItems = {...data};
      console.log(data);
      this.setState({
        todos: todoItems,
      });
    });
  }

  addNewTodo() {
    db.ref('/todos').push({
      done: false,
      todoItem: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To-do item was created');
    this.setState({
      presentToDo: '',
    });
  }



  render() {
    let todosKeys = Object.keys(this.state.todos);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
          <Background>
          <BackButton />
          <Text style={{fontSize: widthToDp("7%"),fontWeight: 'bold',marginTop : heightToDp("15%"), color : "#fff", width: widthToDp("80%")}}>Add a Todo.</Text>
          <Text style={{fontSize: widthToDp("6%"), color : "#fff",marginTop : heightToDp("1%"), width: widthToDp("80%")}}>A Dummy Text !</Text>
      <View style={{marginTop: heightToDp('5%')}} />
          <TextInput
            label="Add new Todo"
            returnKeyType="next"
            value={this.state.presentToDo}
            onChangeText={e => {
              this.setState({
                presentToDo: e,
              });
            }}
            onSubmitEditing={this.addNewTodo}
      />


<TouchableOpacity style={{marginTop: heightToDp("60%")}}          onPress={this.addNewTodo}>
      <View style={{width: widthToDp('80%'), alignItems: 'center',backgroundColor : "#fff",borderRadius: 10, padding : widthToDp("3.5%")}}>
        <Text style={{color : "#191720", fontSize: widthToDp("4.5")}}>Add New Item</Text>
      </View>
      </TouchableOpacity>


    
       
        </Background>
      </ScrollView>
    );
  }
}

const ToDoItem = ({todoItem: {todoItem: name, done}, id}) => {
  const [doneState, setDone] = useState(done);

  const onCheck = () => {
    setDone(!doneState);
    db.ref('/todos').update({
      [id]: {
        todoItem: name,
        done: !doneState,
      },
    });
  };
  return (
    <View style={styles.todoItem}>
      <CheckBox
        checkBoxColor="#92E3A9"
        onClick={onCheck}
        isChecked={doneState}
        disabled={doneState}
      />
      <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191720',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },

  textInput: {
    
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    width: widthToDp('100%'),
    alignItems: 'center',
    marginLeft: widthToDp("15%"),

  },
  todoText: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 5,
    color : "#fff",
    marginLeft: widthToDp("2%"),
    marginRight: 10,
    textAlign: 'center',
  },
});

export default App;