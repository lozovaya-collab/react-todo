import type { IPropsTask } from "./types.ts";
import './Task.scss';

import trashIcon from '../../assets/images/trash-bin.png';

const Task = (props: IPropsTask) => { 
    return (
        <div className="task" onClick={props.onClick}>
            <p className="task_title">{props.task.title}</p>
            <button className="task_delete-btn" onClick={(e) => {
                e.stopPropagation();
                props.delete({ id: props.task.id, completed: props.task.completed });
            }}>
                <img className="task_delete-btn__icon" src={trashIcon} alt="delete task" />
            </button>
        </div>
    )
};

export { Task };