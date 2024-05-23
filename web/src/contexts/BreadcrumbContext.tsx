'use server'

import { PropsWithChildren, ReactNode, createContext } from "react";


// interface IBreadcrumbContext {
//     register: (breadcrumb: IBreadcrumb) => void;
//     unregister: (id: string) => void;
//     compile: () => ReactNode[];
// }

// interface IBreadcrumb {
//     id: string;
//     parent: string | null;
//     render: () => ReactNode;
// }

// export const BreadcrumbContext = createContext<IBreadcrumbContext>({
//     register: () => {},
//     unregister: () => {},
//     compile: () => [],
// });

type IBreadcrumbContextProps = PropsWithChildren<{
    prev: ReactNode[]
    breadcrumb: ReactNode
}>


export async function BreadcrumbContextProvider(props: PropsWithChildren<{ component: ReactNode }>) {
    return (
        <></>
    )
}
