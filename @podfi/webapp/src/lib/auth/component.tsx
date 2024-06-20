import { FunctionComponent, ReactNode } from "react";
import { auth } from ".";

export const AuthGuard: FunctionComponent<{ fallback?: ReactNode, children: ReactNode }> = ({ fallback, children }) => {
  const _auth = auth.hooks.useAuth()

  if (_auth.status === 'signed-in')
    return children

  return fallback
}
