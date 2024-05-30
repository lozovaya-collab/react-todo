import type { ITask } from "../types";

interface IPropsEditTaskModal {
    isOpen: boolean;
    titleModal: string;
    task?: ITask;
    change: (task: ITask) => void;
    close: () => void;
}

export type { IPropsEditTaskModal };