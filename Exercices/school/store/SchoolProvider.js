import React, { createContext, useReducer, useEffect } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

import * as _ from 'lodash';

// Source de vérité doit être ne doit pas muter
const initialState = {
    students: [],
    lessons: [],
    behaviours: new Map(), // en JS un Map identique à un dictionnaire en Python pas ordre dans un Map mais un accès immédiat aux valeurs du Map
    isLoading: false,
    lastIdStudent: null,
    lastIdLesson: null,
    order: false
};

const average = notes => {
    if (notes.length > 0) {
        const numberStudent = notes.length;
        // return Math.floor( ( notes.reduce((acc, curr) => acc + curr, 0) / numberStudent ) * 10 ) / 10 ;
        return Number((notes.reduce((acc, curr) => acc + curr, 0) / numberStudent).toFixed(1));
    }

    return null;
}

const SchoolContext = createContext();

const reducer = (state, action) => {

    let newStudents, student;

    switch (action.type) {

        case 'LOADING':

            return {
                ...state,
                isLoading: action.isLoading
            }

        case 'LOAD_DATA_STUDENTS':

            const { students } = action;

            return {
                ...state,
                students,
                isLoading: false,
                lastIdStudent: students[students.length - 1].id
            }

        case 'LOAD_DATA_LESSONS':

            const { lessons } = action;

            return {
                ...state,
                lessons,
                isLoading: false
            }

        case 'INCREMENTE_ATTENDANCE':

            newStudents = state.students.map(s => {
                if (s.id === action.id) {
                    s.attendance++;
                    student = s;
                }

                return s;
            })

            return {
                ...state,
                students: newStudents,
                student
            };

        case 'DECREMENT_ATTENDANCE':
            newStudents = state.students.map(s => {
                if (s.attendance > 0 && s.id === action.id) {

                    s.attendance--;

                    student = s;
                };

                return s;
            })

            return {
                ...state,
                students: newStudents,
                student
            };

        case 'RESET_ATTENDANCE':

            newStudents = state.students.map(s => {
                s.attendance = 0;

                return s;
            });

            // retourner ici notre newState mis à jour
            return {
                ...state,
                students: newStudents
            }

        case 'ORDER':
            // on crée une nouvelle instance de students pour que React refasse son render sinon les données ne sont pas rafraichies
            // _.clone méthode de lodash pour faire une copie d'un objet
            newStudents = _.clone(state.students);

            if (action.order)
                newStudents.sort((a, b) => average(a.notes) > average(b.notes) ? - 1 : 0);
            else
                newStudents.sort((a, b) => average(a.notes) < average(b.notes) ? -1 : 0);

            return {
                ...state,
                students: newStudents,
                order: !state.order
            }

        case 'MENTION':
            const { id, mention } = action.student;

            const behaviours = new Map(state.behaviours) // clone de Map

            behaviours.set(id, mention);

            return {
                ...state,
                behaviours
            }

        default:
            throw new Error("Bad Action Type");
    }
};

// copie de l'objet par lodash
const copyIntialState = _.cloneDeep(initialState);

const fetchApi = data => new Promise((resolve, reject) => {
    const students = [
        { id: 1, name: "Alice", lessons: [1, 2], attendance: 0, notes: [11, 12, 18] },
        { id: 2, name: "Alan", lessons: [3], attendance: 0, notes: [10, 14.5, 11] },
        { id: 3, name: "Phil", lessons: [1, 2, 3], attendance: 0, notes: [11, 9, 9] },
        { id: 4, name: "Naoudi", lessons: [1], attendance: 0, notes: [14.5, 19, 18] },
        { id: 5, name: "Fenley", lessons: [3], attendance: 0, notes: [9, 7, 11] },
    ];

    const lessons = [
        { id: 1, title: "React" },
        { id: 2, title: "React Native" },
        { id: 3, title: "MongoDB" },
    ];

    setTimeout(() => {
        if (data === 'students') resolve(students);
        else if (data === 'lessons') resolve(lessons);
        else reject('error data');
    }, 500);

});

const SchoolProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, copyIntialState);

    return (
        <SchoolContext.Provider value={[state, dispatch]}>
            {children}
        </SchoolContext.Provider>
    );
}

export { SchoolContext, SchoolProvider, average, fetchApi };