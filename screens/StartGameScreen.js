import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Keyboard,
    Button,
    TouchableWithoutFeedback
    // Pressable
    // Keyboard
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/input';
import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = inputText => {
        // The following line uses regex to replace any non-numerical input to an empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    return (
        <TouchableWithoutFeedback 

        // <Pressable
            onPress={() => {
                // the alert proves the onPress is working
                // alert('Pressed!')

                Keyboard.dismiss() 
                // creates an error on iOS and Android:
                // 'undefined is not an object (evaluating '_reactNative.keyboard.dismiss')
                // keyboard.dismiss();
            }} 
        >
            <View style={styles.startScreen}>
                <Text style={styles.title} >Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input 
                        style={styles.input} 
                        blurOnSubmit 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        keyboardType='numeric' 
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue} 
                    />
                    <View style={styles.buttonContainer} >
                        <View style={styles.button}>
                            <Button title="Reset" onPress={() => {}} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={() => {}} color={Colors.primary}/>
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback >
        // </Pressable>
    )
};

const styles = StyleSheet.create({
    startScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width:100,
    },
    input:{
        width: 50,
        textAlign: 'center',
    }
});

export default StartGameScreen;