import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../../constants'

const PrimaryButton =
    ({
        label = '',
        onPress = () => { },
        style = {},
        textStyle = {},
        disabled = false,
    }) => {
        return (
            <TouchableOpacity
                style={[styles.button, style]}
                onPress={onPress}
                disabled={disabled}>
                <Text style={[styles.text, textStyle]}>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        height: 64,
        borderRadius: 2,
        backgroundColor: Colors.PRIMRAY_COLOR,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 16,
    },
    text: {
        color: Colors.SECONDARY_COLOR,
        fontWeight: 'bold'
    }
})
