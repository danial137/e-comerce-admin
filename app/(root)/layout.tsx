import React from 'react'
import { auth } from "@clerk/nextjs/server";

interface SetupLayoutProps { 
    children: React.ReactNode;

}
const SetupLayout = async ({ children }: SetupLayoutProps) => {
  const { userId } = await auth()
  return (
      <div>
          {children}
    </div>
  )
}

export default SetupLayout