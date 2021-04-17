import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { heightToDp, widthToDp } from '../helpers/dim'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export default function StartScreen({ navigation }) {
  return (
    <ScrollView>
    <Background>
      <View style={{marginTop: heightToDp("-10%")}} />
      <Image
        style={{ width: widthToDp('80%'), height: heightToDp("90%") }}
        source={{
          uri: 'https://i.ibb.co/283Nnrw/Creative-team-bro.png',
        }}
      />
      <Header>Enterprise team collaboration.</Header>
      <View style={{marginTop: heightToDp("5%")}} />
      <Paragraph>
        Bring Together your files, your tools, projects and people. Inclusing a new mobile and desktop application.
      </Paragraph>
      <View style={{marginTop: heightToDp("20%")}} />
      <View style={styles.buttonContainer}>
      <TouchableOpacity         onPress={() => navigation.navigate('RegisterScreen')} >
        <View style={styles.ButtonRegister}>
          <Text style={{color : "#191720", fontSize: widthToDp("4.5%")}}>Register</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity         onPress={() => navigation.navigate('LoginScreen')}>
        <View style={styles.Buttonlogin}>
        <Text style={{color : "#fff", fontSize: widthToDp("4.5%")}}>Sign In</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: heightToDp("10%")}} />
    </Background>
    </ScrollView>

  )
}
const styles = StyleSheet.create({
  buttonContainer: {
   flexDirection: "row",
   backgroundColor : "#3B3A42",
   width: widthToDp("78%"), 
   justifyContent: 'space-between',
   borderRadius: 15,
   elevation: 10,
  },
  ButtonRegister : {
    backgroundColor: "#fff", 
    padding: widthToDp("4%"),
    paddingLeft: widthToDp("10%"),
    elevation: 20,
    borderRadius: 15,
    paddingRight: widthToDp("10%"),
  }, 
  Buttonlogin : {
    padding: widthToDp("4%"),
    borderRadius: 15,
    paddingLeft: widthToDp("10%"),
    paddingRight: widthToDp("10%"),
  }
})
