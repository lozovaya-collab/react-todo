import type { ITask } from "../../views/AppPage/types";

interface IPropsDesk {
    tasks: ITask[];
    children: string; 
    delete: (value: { id: number, completed: boolean }) => void;
    select: (task: ITask) => void;
}

export type { IPropsDesk };