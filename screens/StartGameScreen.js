import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StartGameScreen = props => {
    return (
        <View style={styles.startScreen}>
            <Text>The Game Screen!</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    startScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    }
});

export default StartGameScreen;