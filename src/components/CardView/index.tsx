import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const CardView = ({ children, containerStyle = [] }: any) => {
    return (
        <View style={[containerStyle, styles.container]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        minHeight: 64,
        // alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
});

export default CardView;
