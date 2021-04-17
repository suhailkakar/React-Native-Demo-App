import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { widthToDp } from '../helpers/dim'

export default function Paragraph(props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    width: widthToDp('80%'),
    lineHeight: 21,
    color : "#62616C",
    textAlign: 'center',
    marginBottom: 12,
  },
})
