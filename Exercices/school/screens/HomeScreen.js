import React from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

// Construction des menus
const HomeScreen = ({ navigation }) => {
    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Students"
                    onPress={() => navigation.navigate('Students')}
                />
                <View style={{ marginTop: 10, justifyContent: 'center' }}>
                    <Button
                        title="Go to Lessons"
                        onPress={() => navigation.navigate('Lessons')}
                    />
                </View>
            </View>
        </>
    );
}

export default HomeScreen;