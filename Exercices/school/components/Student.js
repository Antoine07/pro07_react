import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { average } from '../store/SchoolProvider';

import styles from '../styles'

const Student = ({ navigation, student, mention }) => {

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Absences', { student : student })}
        >
        <View
            style={[
                styles.item,
                { flex: 1, flexDirection: 'row' }
            ]}
        >
            <View style={{ width: 110 }}>
                <Image
                    source={{ uri: `http://lorempixel.com/100/100/cats/${student.id}` }}
                    style={{ width: 100, height: 100, padding: 5 }}
                />
            </View>
            <View style={{ width: 200 }}>
                <Text>{student.name}</Text>
                <Text style={{ padding: 2, marginBottom: 2 }} >Nombre d'abscence(s) {student.attendance}</Text>
                <Text style={{ padding: 2, marginBottom: 2 }}  >Nombre de cours {student.lessons ? student.lessons.length : 0}</Text>
                <Text style={{ padding: 2, marginBottom: 2 }} >Moyenne {average(student.notes)}</Text>
                <Text>Mention : { mention || "Aucune"}  </Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}

export default Student;