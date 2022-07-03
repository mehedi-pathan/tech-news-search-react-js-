//Creat Context ✅
//Provider ✅
//useContext Api ✅
//creating a custome hook ✅

import React, { useContext, useEffect, useReducer } from "react"
import reducer from "./Reducer"




//reducer hook creation 
const initialState = {
    isLoading: true,
    query: '',
    page: 0,
    nbPages: 0,
    hits: [],
}

//context creation ✅
const AppContext = React.createContext()


//context provider creation ✅
const AppProvider = ({ children }) => {


    // const [first, setfirst] = useState(second)
    const [state, dispatch] = useReducer(reducer, initialState)

    const API = "https://hn.algolia.com/api/v1/search?"

    const fetchApiData = async (url) => {
        dispatch({
            type: "GET_LOADING",
        })

        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    //remove function emplimentation
    const removePost = (post_Id) => {
        dispatch({ type: "REMOVE_POST", payload: post_Id })
    }

    //search functionality
    const searchPost = (searchQuery) => {
        dispatch({ type: "SEARCH_QUERY", payload: searchQuery })
    }

    // pagination
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
    };

    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        });
    };

    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`)
    }, [state.query, state.page])

    return (
        <AppContext.Provider value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}>{children}
        </AppContext.Provider>
    )
}

//create a custom hook 
const useGlobalContext = () => { return useContext(AppContext) }

export { AppContext, AppProvider, useGlobalContext }