import React from 'react'
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants';

const AppIcon = (props: any) => {
    return (
        <>
            {(props.visible === true || props.visible === undefined) && (
                <Icon
                    name={props.name || "wallet"}
                    size={props.size || 30}
                    color={props.color || Colors.PRIMRAY_COLOR}
                />)
                // <Text>{props.name}</Text>)
            }
        </>
    );
}

export default AppIcon;
