import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { sendEmailWithPassword } from '../api/auth-api'
import Toast from '../components/Toast'
import { heightToDp, widthToDp } from '../helpers/dim'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ value: '', type: '' })

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    setLoading(true)
    const response = await sendEmailWithPassword(email.value)
    if (response.error) {
      setToast({ type: 'error', message: response.error })
    } else {
      setToast({
        type: 'success',
        message: 'Email with password has been sent.',
      })
    }
    setLoading(false)
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Text style={{fontSize: widthToDp("7%"),fontWeight: 'bold',marginTop : heightToDp("15%"), color : "#fff", width: widthToDp("80%")}}>Let's Get it.</Text>
      <Text style={{fontSize: widthToDp("6%"), color : "#fff",marginTop : heightToDp("2%"), width: widthToDp("80%")}}>Forgot Password.</Text>
      <Text style={{fontSize: widthToDp("6%"), color : "#fff",marginTop : heightToDp("0%"), width: widthToDp("80%")}}>We are waiting for you!</Text>
    <View style={{marginTop: heightToDp("5%")}} />
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
         <TouchableOpacity style={{marginTop: heightToDp("65%")}}                 onPress={sendResetPasswordEmail}>
      <View style={{width: widthToDp('80%'), alignItems: 'center',backgroundColor : "#fff",borderRadius: 10, padding : widthToDp("3.5%")}}>
        <Text style={{color : "#191720", fontSize: widthToDp("4.5")}}>Send Instructions</Text>
      </View>
      </TouchableOpacity>
      
      <Toast {...toast} onDismiss={() => setToast({ value: '', type: '' })} />
    </Background>
  )
}
