export interface TransactionalStateStore {
  queryStrings?: QueryStringsToFindInApi;
  info: APIInfo;
  data: CharacterData[];
  isLoading: boolean;
  hasError: boolean;
}

export enum ActionsTransactionState {
  requestWithSuccess = "REQUEST_WITH_SUCCESS",
  requestWithFailure = "REQUEST_WITH_FAILURE",
  isLoading = "IS_LOADING",
  isNotLoading = "IS_NOT_LOADING",
  updateQueryStrings = "UPDATE_QUERY_STRINGS",
}

export interface ActionType<PayloadType = any | undefined> {
  type: ActionsTransactionState;
  payload?: PayloadType;
}

export interface QueryStringsToFindInApi {
  page?: number;
  name?: string;
  status?: "alive" | "dead" | "unknown";
  gender?: "female" | "male" | "genderless" | "unknown";
}

export interface PayloadCharacter {
  info: APIInfo;
  results: CharacterData[];
}

interface APIInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin?: URLAndName;
  location?: URLAndName;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface URLAndName {
  url: string;
  name: string;
}
