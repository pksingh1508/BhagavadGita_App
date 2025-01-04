import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
}

const Button = ({title, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 1,
        marginVertical: 10
    },
    text: {
        color: Colors.orange,
        fontSize: 20,
        fontFamily: 'nb',
        textAlign: 'center'
    }
})

export default Button;
