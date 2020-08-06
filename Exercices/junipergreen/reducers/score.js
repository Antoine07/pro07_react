const initialState = {
    scores: new Map(),
    status: true,
    count: 0
}

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case 'SAVE_SCORE': {

            const scores = new Map(state.scores)
            const count = state.count + 1
            const date = new Map([[Math.random().toString(12).substring(0), (new Date()).toDateString()]])
            const winner = new Map([ [Math.random().toString(12).substring(0), `Winner is : ${action.winner} `] ])
            scores.set(Math.random().toString(12).substring(0), new Map([...action.scores, ...date, ...winner]))

            return {
                ...state,
                scores,
                count,
                status: false
            }
        }

        case 'INIT_GAME':

            return {
                ...state,
                status: true
            }

        default:
            return state
    }
}