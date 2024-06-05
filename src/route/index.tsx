
import { HomePage, AppPage, AppReduxPage } from "../views";

export type TRoute = {
    path: string;
    component: () => JSX.Element;
};

export const routes: TRoute[] = [
    {
        path: '/',
        component: () => <HomePage />
    },
    {
        path: '/simple-app',
        component: () => <AppPage />
    },
    {
        path: '/redux-app',
        component: () => <AppReduxPage />
    }
]