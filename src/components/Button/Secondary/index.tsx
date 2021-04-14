import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { AppIcon } from '../..'

import { Colors } from '../../../constants'

const SecondaryButton =
    ({
        label = '',
        onPress = () => { },
        style = {},
        textStyle = {},
        startIcon = '',
        startIconColor = null,
        startIconSize = null,
        endIcon = '',
        endIconColor = null,
        endIconSize = null,
    }) => {
        return (
            <TouchableOpacity
                style={[styles.button, style]}
                onPress={onPress}>
                <AppIcon
                    visible={startIcon !== ''}
                    name={startIcon}
                    color={startIconColor}
                    size={startIconSize}
                    style={styles.endIcon}
                />
                <Text style={[styles.text, textStyle]}>
                    {label}
                </Text>
                <AppIcon
                    visible={endIcon !== ''}
                    name={endIcon}
                    color={endIconColor}
                    size={endIconSize}
                    style={styles.endIcon}
                />
            </TouchableOpacity>
        )
    }

export default SecondaryButton;

const styles = StyleSheet.create({
    button: {
        height: 64,
        flex: 1,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.PRIMRAY_COLOR,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 16,
        padding: 8,
    },
    text: {
        color: Colors.SECONDARY_COLOR,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    endIcon: {
    }
})
