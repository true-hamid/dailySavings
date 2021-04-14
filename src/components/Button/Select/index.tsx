import React from 'react'
import { SafeAreaView, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import { SecondaryButton } from '..';
import { Colors } from '../../../constants';
import AppIcon from '../../Icon';

const SelectButtons = ({
    data = [],
    selectedButton = '',
    onSelection = () => { }
}: any) => {

    const SelectButton = ({ item }: any) => (
        // <SecondaryButton
        //     label={''}
        //     startIcon={item.icon}
        //     startIconSize={styles.iconSize.width}
        //     style={[styles.button, selectedButton === item.value ? styles.selectedButton : []]}
        //     startIconColor={styles.randomColor.color}
        //     onPress={onSelection}
        // />
        <TouchableOpacity 
            style={[styles.button, selectedButton === item.value ? styles.selectedButton : []]} 
            onPress={() => onSelection(item.value)}>
            <AppIcon
                name={item.icon}
                color={selectedButton === item.value ? Colors.SNOW_WHITE : Colors.PRIMRAY_COLOR}
            />
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                horizontal={false}
                data={data}
                renderItem={SelectButton}
                keyExtractor={(item: any) => item.id}
                numColumns={3}
            />
        </SafeAreaView>
    );
}

export default SelectButtons;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    selected: {
        backgroundColor: Colors.PRIMRAY_COLOR,
    },
    button: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        borderWidth: 1,
        borderColor: Colors.PRIMRAY_COLOR,
        borderRadius: 4,
    },
    selectedButton: {
        backgroundColor: Colors.PRIMRAY_COLOR
    },
    randomColor: {
        color: Colors.JET_BLACK,
    },
    iconSize: {
        width: 16,
    },
})
