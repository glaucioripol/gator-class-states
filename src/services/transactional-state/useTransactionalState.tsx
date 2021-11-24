import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer } from 'react';

import {
  ActionsTransactionState,
  PayloadCharacter,
  QueryStringsToFindInApi,
} from './types'
import { initialState, reducer } from './reducerTransactionalState'

import { get } from './api'

const END_POINT = "https://rickandmortyapi.com/api/character/";

export const useTransactionalState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter()

  const updateQueryStrings = () => {
    dispatch({
      type: ActionsTransactionState.updateQueryStrings,
      payload: router.query
    })
  }
  useEffect(updateQueryStrings, [router.query])

  const getCharacters = useCallback(
    async () => {
      dispatch({ type: ActionsTransactionState.isLoading })

      try {
        const response = await get<PayloadCharacter | {}>(END_POINT, state.queryStrings)

        dispatch({
          type: ActionsTransactionState.requestWithSuccess,
          payload: response.data
        })

      } catch {
        dispatch({ type: ActionsTransactionState.requestWithFailure })
      }

      dispatch({ type: ActionsTransactionState.isNotLoading })
    },
    [dispatch, state.queryStrings],
  )

  useEffect(() => {
    getCharacters()
  }, [getCharacters])

  const updateFilters = (key: keyof QueryStringsToFindInApi, value: string) => {
    dispatch({
      type: ActionsTransactionState.updateQueryStrings,
      payload: { [key]: value }
    })

    router.push('/transactional-state', {
      query: {
        ...state.queryStrings,
        [key]: value
      }
    })
  }

  return { ...state, updateFilters }
}
