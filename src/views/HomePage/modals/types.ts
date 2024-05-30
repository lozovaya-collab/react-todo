import type { ITask } from "../types";

interface IPropsTaskModal {
    isOpen: boolean;
    titleModal: string;
    task?: ITask;
    change: (task: ITask) => void;
    close: () => void;
}

export type { IPropsTaskModal };