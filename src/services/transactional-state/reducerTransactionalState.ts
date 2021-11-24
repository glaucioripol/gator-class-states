import {
  TransactionalStateStore,
  ActionType,
  ActionsTransactionState,
  PayloadCharacter,
  QueryStringsToFindInApi,
} from "./types";

export const initialState: TransactionalStateStore = {
  queryStrings: {},
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  data: [],
  isLoading: false,
  hasError: false,
};

export const reducer = (state: TransactionalStateStore, action: ActionType) => {
  const actionsMapped = {
    [ActionsTransactionState.requestWithSuccess]: ({
      payload,
    }: ActionType<PayloadCharacter>) => ({
      ...state,
      info: payload?.info,
      data: payload?.results,
      isLoading: false,
      hasError: false,
    }),
    [ActionsTransactionState.requestWithFailure]: () => ({
      ...state,
      isLoading: false,
      hasError: true,
    }),
    [ActionsTransactionState.isLoading]: () => ({
      ...state,
      isLoading: true,
      hasError: false,
    }),
    [ActionsTransactionState.isNotLoading]: () => ({
      ...state,
      isLoading: false,
    }),
    [ActionsTransactionState.updateQueryStrings]: ({
      payload,
    }: ActionType<QueryStringsToFindInApi>) => ({
      ...state,
      queryStrings: {
        ...state.queryStrings,
        ...payload
      },
    }),
  };

  const selectedAction = actionsMapped[action.type];

  return (
    selectedAction ? selectedAction(action as unknown as any) : state
  ) as TransactionalStateStore;
};
