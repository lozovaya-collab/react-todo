import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTodos } from "../../stores/asyncThunks/tasksThunk";
import { getLists, createTask, deleteTask } from "../../stores/slices/tasksSlice";
import { useAppDispatch, useAppSelector } from "../../stores/reduxHooks";
import type { ITask } from "./types";
import { Desk } from "../../components/Desk/Desk";
import { TaskModal } from "../AppPage/modals/TaskModal";

import '../AppPage/AppPage.scss';

    
const AppReduxPage = () => {
    const dispatch = useAppDispatch();
    const { tasks, completedTasks, nonCompletedTasks, isLoading } = useAppSelector((s: any) => s.tasks);

    const [selectedTask, setSelectedTask] = useState<ITask | null>(null)
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

    const deleteAction = (payload: {isCompleted: boolean; taskId: number}) => {
        dispatch(deleteTask(payload));
    }

    const editTask = (task: ITask) => {
        const todos: ITask[] = [...completedTasks, ...nonCompletedTasks]

        const indTask: number = todos.findIndex((item: ITask) => item.id === task.id);

        if (todos[indTask]) {
            todos[indTask] = { ...task };

            dispatch(getLists(todos));
        }

        setSelectedTask(null); 
    }

    const createAction = (task: ITask) => {
        dispatch(createTask(task));
        setIsOpenCreateModal(false)
    }

    useEffect(() => {
        dispatch(getTodos());
    }, []);

    useEffect(() => {
        if(tasks.length){
            dispatch(getLists(tasks));
        }
    }, [ isLoading ]);

    

    return (
        <div className="todo-page">
            <div className="todo-page_header">
                <h2 className="todo-page_headline">
                    <button className="todo-page_header__back-btn">
                        <Link to="/">
                            Return to Home
                        </Link>
                    </button>
                    TODO APP with ReduxToolkit
                </h2>
                <button onClick={() => setIsOpenCreateModal(true)}>Create task</button>
            </div>
            <div className="todo-page_wrapper">
                <Desk tasks={nonCompletedTasks} delete={(value) => deleteAction({isCompleted: value.completed, taskId: value.id})} select={(value) => setSelectedTask(value)}>To Do</Desk>
                <Desk tasks={completedTasks} delete={(value) => deleteAction({isCompleted: value.completed, taskId: value.id})} select={(value) => setSelectedTask(value)}>Completed</Desk>
            </div>
            {selectedTask && 
            <TaskModal titleModal="Edit Task" task={selectedTask} isOpen={!!selectedTask} change={(value) => editTask(value)} close={() => setSelectedTask(null)} />}
            {
            isOpenCreateModal &&
            <TaskModal titleModal="Create Task" isOpen={isOpenCreateModal} change={(value) => createAction(value)} close={() => setIsOpenCreateModal(false)} />
            }
        </div>
    )
};

export { AppReduxPage };