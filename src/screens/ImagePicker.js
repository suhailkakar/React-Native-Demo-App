import React, { Component } from "react";
import { Text, View, Button,TouchableOpacity,Image } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import { db } from "../core/config";
import { widthToDp, heightToDp, width } from "../helpers/dim";

export default class Picker extends Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: "",
      base64: "",
    };
  }

  uploadImage = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: false,
    }).then((images) => {
      let mainimage = "data:image/png;base64," + images.data;
      this.setState({base64: mainimage})
      db.ref("/images").push({
        done: false,
        todoItem: mainimage,
      });
    });
    return
  }
  componentDidMount() {
    db.ref("/images").on("value", (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};

      let todoItems = { ...data };
      console.log(data);
      this.setState({
        todos: todoItems,
      });
    });
    console.log("Database is Ready");
  }

  render() {

    return (
      <Background>
        <BackButton />
        <Text style={{ fontSize: widthToDp("7%"), fontWeight: "bold", marginTop: heightToDp("15%"), color: "#fff", width: widthToDp("80%") }}>Upload an Image.</Text>
        <Text style={{ fontSize: widthToDp("6%"), color: "#fff", marginTop: heightToDp("1%"), width: widthToDp("80%") }}>A Dummy Text !</Text>
        <TouchableOpacity style={{marginTop: heightToDp("10%")}}          onPress={this.uploadImage} >
       <Image style={{width: widthToDp("78%"),marginTop: heightToDp("4%"),borderWidth:1, borderRadius: widthToDp("4%"), borderColor: "#7E7F8B", height: heightToDp("70%")}} source={{uri: this.state.base64}} />
      </TouchableOpacity>
       <TouchableOpacity style={{marginTop: heightToDp("10%")}}          onPress={this.uploadImage}>
      <View style={{width: widthToDp('80%'), alignItems: 'center',backgroundColor : "#fff",borderRadius: 10, padding : widthToDp("3.5%")}}>
        <Text style={{color : "#191720", fontSize: widthToDp("4.5")}}>Upload an Image</Text>
      </View>
      </TouchableOpacity>

        
      </Background>
    );
  }
}
