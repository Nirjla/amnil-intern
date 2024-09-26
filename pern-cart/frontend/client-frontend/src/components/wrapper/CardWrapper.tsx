import React from "react";

export default function CardWrapper({ children }: { children: React.ReactNode }) {
      return (<>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  {children && children}
            </div>
      </>)
}