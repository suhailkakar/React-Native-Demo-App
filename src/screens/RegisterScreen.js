import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { signUpUser } from '../api/auth-api'
import Toast from '../components/Toast'
import { heightToDp, widthToDp } from '../helpers/dim'
import { ScrollView } from 'react-native-gesture-handler'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setLoading(true)
    const response = await signUpUser({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
  }

  return (
    <ScrollView >
    <Background >

      <BackButton goBack={navigation.goBack} />
      <Text style={{fontSize: widthToDp("7%"),fontWeight: 'bold',marginTop : heightToDp("15%"), color : "#fff", width: widthToDp("80%")}}>Let's Sign up in.</Text>
      <Text style={{fontSize: widthToDp("6%"), color : "#fff",marginTop : heightToDp("2%"), width: widthToDp("80%")}}>Welcome Abroad.</Text>
      <Text style={{fontSize: widthToDp("6%"), color : "#fff",marginTop : heightToDp("0%"), width: widthToDp("80%")}}>We are waiting for you!</Text>
    <View style={{marginTop: heightToDp("3%")}} />
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
        <TouchableOpacity style={{marginTop: heightToDp("35%")}}         onPress={onSignUpPressed}>
      <View style={{width: widthToDp('80%'), alignItems: 'center',backgroundColor : "#fff",borderRadius: 10, padding : widthToDp("3.5%")}}>
        <Text style={{color : "#191720", fontSize: widthToDp("4.5")}}>Register</Text>
      </View>
      </TouchableOpacity>
      

      <View style={styles.row}>
        <Text style={{color : "#73737F"}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      <Toast message={error} onDismiss={() => setError('')} />
      <View style={{marginTop: heightToDp("10%")}} />

    </Background>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: '#fff',

  },
})
