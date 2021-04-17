import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
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
import { loginUser } from '../api/auth-api'
import Toast from '../components/Toast'
import { heightToDp, widthToDp } from '../helpers/dim'
import { ScrollView } from 'react-native-gesture-handler'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setLoading(true)
    const response = await loginUser({
      email: email.value,
      password: password.value,
    })
    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
  }

  return (
    <ScrollView>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Text style={{fontSize: widthToDp("7%"),fontWeight: 'bold',marginTop : heightToDp("15%"), color : "#fff", width: widthToDp("80%")}}>Let's Sign you in.</Text>
      <Text style={{fontSize: widthToDp("6%"), color : "#fff",marginTop : heightToDp("2%"), width: widthToDp("80%")}}>Welcome back.</Text>
      <Text style={{fontSize: widthToDp("6%"), color : "#fff",marginTop : heightToDp("0%"), width: widthToDp("80%")}}>You've been missed!</Text>
    <View style={{marginTop: heightToDp("5%")}} />
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{marginTop: heightToDp("42%")}} onPress={onLoginPressed}>
      <View style={{width: widthToDp('80%'), alignItems: 'center',backgroundColor : "#fff",borderRadius: 10, padding : widthToDp("3.5%")}}>
        <Text style={{color : "#191720", fontSize: widthToDp("4.5")}}>Sign In</Text>
      </View>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={{color : "#73737F"}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
      </ScrollView>

  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    color: '#fff',
  },
})
