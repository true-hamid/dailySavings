import React, { useState } from 'react'
import { View, Text } from 'react-native'

import { Picker } from '@react-native-picker/picker';

const Dropdown = ({ dropDownValues }) => {
    const values = []
    const [selectedValue, setSelectedValue] = useState('')

    return (
        <View>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                {
                    dropDownValues.map((item: any) => {
                        return (
                            <Picker.Item key={item.id} label={item.label} value={item.value} />
                        );
                    })
                }
            </Picker>
        </View>
    )
}

export default Dropdown;
