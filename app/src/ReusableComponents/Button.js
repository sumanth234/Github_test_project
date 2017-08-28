/**
 * Created by sumanthu on 28/08/17.
 */
import React from 'react';
import {TouchableOpacity,Text} from 'react-native';

const Button = ({buttonStyle,children,buttonClick}) =>{
    return(

        <TouchableOpacity
            style={buttonStyle}
            onPress={buttonClick}>
            {children}
        </TouchableOpacity>
    )

}
export {Button}