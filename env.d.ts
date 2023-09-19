/// <reference types="vite/client" />

// [mk] for broswer phantom wallet plugin
interface Window {
  phantom: any;
}

// [mk] for vuex ts coding
type tVuexDispatch = (type: string, payload?: any) => any;

type tVuexCommit = (type: string, payload?: any) => any;

interface iVuexActionContext<T, R> {
  state: T;
  commit: tVuexCommit;
  dispatch: tVuexDispatch;
}

// [mk] for backend response ts coding
interface iServerResponseWithT<T> {
  code: number,
  data: T | T[],
  message: string,
}

// [mk] for provider ts coding
interface iProviderOutput {
  result: boolean,
  data?: any,
  message?: string,
}
interface iProviderOutputWithT<T> {
  result: boolean,
  code?: number,
  data: T | any,
  message?: string,
}
interface iProviderOutputArrayWithT<T> {
  result: boolean,
  data: T[] | [],
  message: string,
}