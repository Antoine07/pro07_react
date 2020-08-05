
import React, { useContext, useEffect, useCallback } from 'react';

import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ActivityIndicator
} from 'react-native';

import styles from '../styles';

import { SchoolContext, fetchApi } from '../store/SchoolProvider';

import Student from '../components/Student';

const StudentsScreen = ({ navigation }) => {
    // ON RECUPERE LE CONTEXTE DANS LEQUEL ON A NOTRE PROVIDER
    // EN FAISANT DE LA DECOMPOSITION value={[state, dispacth]} state et dispatch DE VOTRE useReducer
    const [state, dispatch] = useContext(SchoolContext);
    const { lastIdStudent, students, isLoading, behaviours } = state;

    useEffect(() => {
        const fetchData = async () => {

            dispatch({
                type: "LOADING",
                isLoading: true
            });

            const students = await fetchApi('students');

            dispatch({
                type: "LOAD_DATA_STUDENTS",
                students: students,
                isLoading: false
            });
        };

        if (students.length > 0) {
            const { id } = students[students.length - 1];

            if (lastIdStudent != id) fetchData();
        }
        if (students.length === 0)
            fetchData();

    }, [lastIdStudent]); // on watch le state isLoading

    if (isLoading)
        return (
            <SafeAreaView style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </SafeAreaView>
        );

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }} >
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => dispatch({ type: 'RESET_ATTENDANCE' })}
            >
                <Text style={styles.buttonText}>Reset abscence (TODO)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => dispatch({ type: 'ORDER', order: state.order })}
            >
                <Text style={styles.buttonText}>Order average (TODO) </Text>
            </TouchableOpacity>
            <FlatList
                style={styles.containerStudent}
                data={students}
                extraData={behaviours}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {

                    return (
                        <Student
                            student={item}
                            navigation={navigation}
                            mention={ behaviours.get(item.id ) || "Aucune" }
                        />
                    );
                }}
            />
        </SafeAreaView>
    )
}

export default StudentsScreen;