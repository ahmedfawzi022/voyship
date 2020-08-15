import { createContext, useContext } from 'react';

export const ErrorContext = createContext();

export function useError() {
  return useContext(ErrorContext);
}