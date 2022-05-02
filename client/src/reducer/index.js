import  * as act  from "../constant";

const initialState = {
    pokemones: [],
    loading: true,
    searchResult: [],
    typesPok: [],
    pokTemp: [],
    pokDetail: {},
    msgDbOK: false,
    msgDbFail: false,
    msgDbName: false
};

const pokemones = (state = initialState, action) => {
    switch (action.type) {

        case act.GET_POKEMONES:
            return {
                ...state,
                loading: false,
                pokemones: action.payload,
                pokTemp: action.payload
            };

        case act.CREATE_POKEMON:


            return {
                ...state,
                loading: false,
                msgDbOK: action.payload.msg === 'ok' ? true : false,
                msgDbFail: action.payload.msgF === 'fail' ? true : false,
                msgDbName: action.payload.msgDbName === 'nameExist' ? true : false

            };

        case act.SEARCH_POKEMON:
            return {
                ...state,
                loading: false,
                searchResult: action.payload,
                msgDbFail: action.payload.msg === 'fail' ? true : false
            };
        case act.GET_POK_BY_ID:
            return {
                ...state,
                loading: false,
                pokDetail: action.payload
            };

        case act.GET_TYPES:
            return {
                ...state,

                typesPok: action.payload
            };


        case act.setLoading:
            return {
                ...state,
                loading: action.payload,

            };
        case act.setMsgDb:
            return {
                ...state,
                msgDbOK: action.payload,

            };
        case act.setMsgDbFail:
            return {
                ...state,
                msgDbFail: action.payload,

            };
        case act.setMsgDbName:
            return {
                ...state,
                msgDbName: action.payload,

            };


        case act.CLEAR_POKDETAIL:
            return {
                ...state,
                pokDetail: {}

            };



        default: return state;
    }



};

export default pokemones;

