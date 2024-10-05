'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { TTokenUser } from "../types";
import { getCurrentUser } from "../services/AuthService";


const UserContext = createContext<IUserProviderValues | undefined>(undefined)

interface IUserProviderValues {
  user: TTokenUser | null,
  setUser: (user: TTokenUser | null) => void,
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
}

const userProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TTokenUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user)
    setIsLoading(false)
  }

  useEffect(() => {
    handleUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  )
};

export default userProvider;