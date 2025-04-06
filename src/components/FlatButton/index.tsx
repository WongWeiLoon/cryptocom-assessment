import React, { Children, ReactNode } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Button, ButtonProps } from 'react-native-paper'

type ButtonType = {
    style?: ViewStyle;
    children: ReactNode;
} & ButtonProps; // Inherit all ButtonProps from react-native-paper

const FlatButton = ({ style, children, ...props }: ButtonType) => {
  return (
    <Button
        {...props}
        mode="contained"
        style={[styles.button, style]}
        labelStyle={styles.buttonLabel} 
    >
        {children}
    </Button>
  )
}

export default FlatButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        padding: 3,
        marginHorizontal: 8,
    },
    buttonLabel: {
        fontSize: 16, 
        color: 'white', 
    },
})