import React, { Component } from 'react'
import { Text, TextInput, View, Button, Alert, StyleSheet, FlatList } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import { addAmount, calculTokens, resetTokens } from '../actions/actions-types'


const Denomination = () => {

    const { tokens, amount, memory } = useSelector(state => {
        return {
            tokens: state.d.tokens,
            amount: state.d.amount,
            memory: state.m.memory
        }
    })

    const dispatch = useDispatch()

    let Amount = null

    if (tokens.has('amount')) {
        Amount = tokens.get('amount')
        tokens.delete('amount')
    }

    console.log(memory)

    return (
        <View style={styles.header}>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType='number-pad'
                onChangeText={amount => dispatch(addAmount(amount))}
                value={amount}
            />
            <View>
                <Button
                    onPress={() => {
                        dispatch(calculTokens())

                    }}
                    title="Dénomination"
                />
            </View>
            <View>
                <Button
                    onPress={() => dispatch(resetTokens())}
                    title="Reset"
                />
            </View>
            {Amount != null &&
                <>
                    <Text>{Amount}</Text>
                    <FlatList
                        data={[...tokens.keys()]}
                        keyExtractor={item => item.toString()}
                        renderItem={({ item }) => {

                            return (
                                <Text>Token : {item} quantity : {tokens.get(item)}</Text>
                            );
                        }}
                    />
                </>
            }

            {memory.size > 0 &&
                <>
                    <Text>Memory</Text>
                    <FlatList
                        data={[...memory.keys()]}
                        keyExtractor={item => item.toString()}
                        renderItem={({ item }) => {

                            const { amount, tokens,  day } = memory.get(item)

                            return (
                                <>
                                    <Text>{amount}</Text>
                                    <FlatList
                                        data={[...tokens.keys()]}
                                        keyExtractor={item => item.toString()}
                                        renderItem={({ item }) => {
                                            return (
                                                <Text>Token : {item} quantity : {tokens.get(item)} Day : { day } </Text>
                                            )
                                        }}
                                    />
                                </>
                            );
                        }}
                    />
                </>
            }
        </View>
    )

}

export default Denomination;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 100
    },
    input: {
        height: 40
    }
});