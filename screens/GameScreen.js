import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );

    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
           onGameOver(rounds); 
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'higher' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie to the computer!", "You know lying is wrong...", 
            [
                {text: 'Sorry!', style: 'cancel' }
            ])
            return;
        }
        if (direction === 'lower') {
            // console.log('currentHigh: ' + currentHigh.current);
            currentHigh.current = currentGuess;
            console.log('New currentHigh: ' + currentHigh.current);
        } else {
            // console.log('currentLow: ' + currentLow.current);
            currentLow.current = currentGuess;
            console.log('New currentLow: ' + currentLow.current);
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'higher')} />
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;