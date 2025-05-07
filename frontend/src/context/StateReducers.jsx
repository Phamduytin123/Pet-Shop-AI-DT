import { ReducerCases } from "../constants/ReducerCases"

export const initialState = {
    account: undefined,
    profile: undefined,
    recommendItems: undefined,
    highRatingItems: undefined,
}

const reducer = (state, action) => {
    switch (action.type) {
        case ReducerCases.SET_ACCOUNT_INFO:
            return {
                ...state,
                account: action.data
            }
        case ReducerCases.SET_PROFILE:
            return {
                ...state,
                profile: action.data
            }
        case ReducerCases.SET_RECOMMEND_ITEMS:
            return {
                ...state,
                recommendItems: action.data
            }
        case ReducerCases.SET_HIGH_RATING_ITEMS:
            return {
                ...state,
                highRatingItems: action.data
            }
        case ReducerCases.RESET_STATE:
            return initialState
    }
}

export default reducer;