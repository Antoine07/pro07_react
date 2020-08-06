import React, { useEffect } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    TextInput,
    Alert
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { setChoice, sendChoice, initGame, incrementAsync } from '../actions/actions-types'

import styles from '../styles'

const GameScreen = ({ navigation }) => {

    const {
        valid,
        computer,
        choices,
        player,
        message
    } = useSelector(state => {
        return {
            valid: state.juniper.valid, // Permet de récupérer les valeurs uniquement du Map dans le store
            choices: state.juniper.choices,
            computer: state.juniper.computer,
            player: state.juniper.player,
            message: state.juniper.message,
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (message) alterBox();
    }, [message]);

    useEffect(() => {
        dispatch(incrementAsync(false));
    }, []);

    const onValid = () => {
        dispatch(sendChoice());
    }

    const stat = () => {

        return (
            <View style={styles.choices}>
                <View style={styles.itemChoice}>
                    <Text style={styles.paragraph} > Valeurs possibles (debug) </Text >
                    <FlatList
                        data={[...valid.values()]}
                        renderItem={({ item }) => <Text style={styles.number}>{item}</Text >}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.itemChoice}>
                    <Text style={styles.paragraph} > Gamers choices (debug) </Text >
                    <FlatList
                        data={[...choices.values()]}
                        renderItem={({ item }) => <Text style={styles.number}>{item}</Text >}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }

    // Alert marche uniquement sur le téléphone
    const alterBox = () =>
        Alert.alert(
            "Alert Title",
            message,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );


    const play = () => {

        // Jeu terminé, on peut ré-initialiser le jeu
        if (valid.size === 0)
            return (
                <>
                    <Text style={styles.paragraph} >Que souhaitez faire ?</Text>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => dispatch(initGame())}>
                        <Text style={styles.buttonText}>Replay</Text>
                    </TouchableOpacity>
                </>
            )

        return (
            <View style={styles.content}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => dispatch(setChoice(text))}
                    keyboardType='number-pad'
                    value={player}
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => onValid()}
                >
                    <Text style={styles.paragraph} >Valider</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const getMessage = () => message ? <Text>{message}</Text> : null;

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }} >
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Game')}>
                <Text style={styles.buttonText}>Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Score')}>
                <Text style={styles.buttonText}>Score</Text>
            </TouchableOpacity>
            {play()}
            <View><Text style={styles.paragraph}>Choice computer : {computer}</Text></View>
            {getMessage()}
            {valid.size > 0 && stat()}
        </SafeAreaView>
    )
}
export default GameScreen