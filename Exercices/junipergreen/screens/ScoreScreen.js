import React, { useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { useSelector } from 'react-redux'

import styles from '../styles'

const ScoreScreen = ({ navigation }) => {
    const { scores, status } = useSelector(state => state.score)

    useEffect(() => {
        console.log(status, scores)
    }, [])

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%",
                    marginTop : "5%",
                    marginBottom : "5%"
                }}
            />
        );
    };
    return (
        <View style={styles.container}>
            <Text>Score</Text>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Game</Text>
            </TouchableOpacity>
            {scores.size > 0 &&
                <View style={styles.choices}>
                    <View style={styles.itemChoice}>
                        <Text style={[styles.paragraph, { fontSize : 15, fontWeight : "bold" }]} > Statistiques scores </Text >
                        <FlatList
                            data={[...scores.keys()]}
                            keyExtractor={({ item }) => Math.random().toString(12).substring(0)}
                            renderItem={({ item }) => {
                                const stat = scores.get(item)

                                return (
                                    <FlatList
                                        data={[...stat.keys()]}
                                        keyExtractor={({ item }) => Math.random().toString(12).substring(0)}
                                        renderItem={({ item }) => {
                                            return <Text>{stat.get(item)}</Text>
                                        }

                                        }
                                    />
                                )
                            }
                            }
                            ItemSeparatorComponent={renderSeparator}
                        />
                    </View>
                </View>
            }
        </View>
    )
}
export default ScoreScreen