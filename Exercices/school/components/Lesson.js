import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import styles from '../styles'

const Lesson = ({ lesson }) => {

    return (
        <View
            style={[
                styles.item,
                { flex: 1, flexDirection: 'row' }
            ]}
        >
            <View style={{ width: 310 }}>
                <Text style={{ padding: 2, marginBottom: 2 }} >{lesson.title}</Text>
            </View>
        </View>
    );
}

export default Lesson;