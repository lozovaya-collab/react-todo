import { useEffect, useState } from "react";

import type { IPropsTaskModal } from "./types";
import type { ITask } from "../types";
import { Popup } from "../../../components/Popup/Popup";

import './TaskModal.scss';

const TaskModal = (props: IPropsTaskModal) => 
{
    const [currentTask, setCurrentTask] = useState<ITask>({
        id: 0,
        title: '',
        completed: false,
        userId: 1
    })

    useEffect(() => { 
        if(props.task)
        setCurrentTask(props.task)
    }, []);


    const content = (): JSX.Element => {
        return (
            <>
                <div className="edit-input">
                    <label htmlFor="task_title">Title</label>
                    <textarea
                        value={currentTask.title}
                        name="task_title"
                        id="task_title"
                        onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                    ></textarea>
                </div>
                
                <div className="edit-checkbox">
                    <label htmlFor="task_completed_status">Completed</label>
                    <input
                        checked={currentTask.completed}
                        onChange={(e) => setCurrentTask({ ...currentTask, completed: e.target.checked })}
                        type="checkbox"
                        name="task_completed_status"
                        id="task_completed_status"/>
                </div>
            </>
        )
    }

    const actions = (): JSX.Element => {
        return (
            <>
                <button onClick={() => props.change(currentTask)}>Сохранить</button>
                <button onClick={props.close}>Отмена</button>
            </>
        )
    }

    return (
        <>
            {
                props.isOpen &&
                <Popup content={content} actions={actions}>{ props.titleModal }</Popup>
        }
        </>
    )
}
    
export { TaskModal };