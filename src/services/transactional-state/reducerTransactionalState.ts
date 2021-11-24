import {
  TransactionalStateStore,
  ActionType,
  ActionsTransactionState,
  PayloadCharacter,
} from "./types";

export const initialState: TransactionalStateStore = {
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
  };

  const selectedAction = actionsMapped[action.type];

  return (
    selectedAction ? selectedAction(action) : state
  ) as TransactionalStateStore;
};
