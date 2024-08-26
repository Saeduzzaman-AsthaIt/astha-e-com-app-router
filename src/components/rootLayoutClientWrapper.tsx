"use client";

import Header from "@/components/header";

import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const RootLayoutClientWrapper = ({children}: {children: React.ReactNode}) => {    
    const [queryClient] = useState(() => new QueryClient());
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>        
                <Header />
                {/* <HydrationBoundary> */}
                    {children}
                    {/* <Component {...pageProps} /> */}
                {/* </HydrationBoundary> */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default RootLayoutClientWrapper;