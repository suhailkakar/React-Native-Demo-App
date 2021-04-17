import React from 'react'
import { ImageBackground,View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'
import { heightToDp } from '../helpers/dim'

export default function Background({ children }) {
  return (
    <View
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#191720',
  },
  container: {
    marginTop: heightToDp("3%"),
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
