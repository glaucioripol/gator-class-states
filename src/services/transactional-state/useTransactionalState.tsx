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
        const { data } = await get<PayloadCharacter | {}>(END_POINT, state.queryStrings)

        dispatch({
          type: ActionsTransactionState.requestWithSuccess,
          payload: data
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

  const updateFilters = (key: keyof QueryStringsToFindInApi, value: string | number) => {
    dispatch({
      type: ActionsTransactionState.updateQueryStrings,
      payload: { [key]: value }
    })

    const query = {
      ...state.queryStrings, [key]: value
    }

    if (key === 'name' && value === '') {
      delete query.name
      delete state.queryStrings?.name
    }

    router.push('/transactional-state', {
      query: query
    })
  }

  return { ...state, updateFilters }
}
