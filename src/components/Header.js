import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import { widthToDp } from '../helpers/dim'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    letterSpacing: 1,
    fontSize: widthToDp("7%"),
    color: "#fff",
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})
