import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { Colors } from '../../constants';
import { AppIcon } from '..';

export const BadgeWithIcon = ({ name, icon }) => {
    return (
        <View style={styles.container}>
            <AppIcon name={icon} color={styles.randomColor.color} />
            <View style={styles.innerContainer}>
                <Text>{name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
        marginTop: 5,
        marginBottom: 5,
    },
    innerContainer: {
        position: 'absolute',
        right: -10,
        top: -6,
        backgroundColor: Colors.PRIMRAY_COLOR,
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
    
});

export default BadgeWithIcon;
