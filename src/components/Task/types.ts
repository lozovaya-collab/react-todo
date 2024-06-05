import type { ITask } from "../../views/AppPage/types";

interface IPropsTask {
    task: ITask;
    delete: (value: { id: number, completed: boolean }) => void;
    onClick: () => void;
}

export type { IPropsTask };