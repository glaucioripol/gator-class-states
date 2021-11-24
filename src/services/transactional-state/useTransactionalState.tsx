import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer } from 'react';
import axios from "axios";

import {
  ActionsTransactionState,
  PayloadCharacter,
  QueryStringsToFindInApi,
} from './types'
import { initialState, reducer } from './reducerTransactionalState'

const END_POINT = "https://rickandmortyapi.com/api/character/";

export const useTransactionalState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter()


  const getCharacters = useCallback(
    async (parameters: QueryStringsToFindInApi) => {
      dispatch({ type: ActionsTransactionState.isLoading })

      try {
        const response = await axios.get<PayloadCharacter>(END_POINT, {
          params: parameters
        })

        dispatch({
          type: ActionsTransactionState.requestWithSuccess,
          payload: response.data
        })

      } catch {
        dispatch({ type: ActionsTransactionState.requestWithFailure })
      }

      dispatch({ type: ActionsTransactionState.isNotLoading })
    },
    [dispatch],
  )

  useEffect(() => {
    getCharacters(router.query)
  }, [getCharacters, router.query]
  )

  const updateFilters = useCallback(
    (key: keyof QueryStringsToFindInApi, value: string) => {
      router.push('/transactional-state', {
        query: {
          ...router.query,
          [key]: value
        }
      })
    }, [router]
  )

  return { ...state, updateFilters }
}
