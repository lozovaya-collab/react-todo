import type { ITask } from "../../views/HomePage/types";

interface IPropsTask {
    task: ITask;
    delete: (value: { id: number, completed: boolean }) => void;
    onClick: () => void;
}

export type { IPropsTask };