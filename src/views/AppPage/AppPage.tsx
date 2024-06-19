import { useEffect, useState } from "react";

import { getTodos } from "../../api";
import type { ITask } from "./types";
import { Desk } from "../../components/Desk/Desk";
import { TaskModal } from "./modals/TaskModal";

import './AppPage.scss';
import { Link } from "react-router-dom";
    
const AppPage = () => {
    const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
    const [nonCompletedTasks, setNonCompletedTasks] = useState<ITask[]>([]);
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null)
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

    const getTasks = async () => {
        const tasks: ITask[] = await getTodos();

        if (tasks) {
            setCompletedTasks(tasks.filter((item: ITask) => item.completed));
            setNonCompletedTasks(tasks.filter((item: ITask) => !item.completed));
        }
    }

    const deleteTask = (id: number, isCompletedTask: boolean) => {
        if (isCompletedTask) {
            setCompletedTasks(completedTasks.filter((item: ITask) => item.id !== id));
        } else {
            setNonCompletedTasks(nonCompletedTasks.filter((item: ITask) => item.id !== id));
        }
    }

    const editTask = (task: ITask) => {
        const tasks: ITask[] = [...completedTasks, ...nonCompletedTasks]

        const indTask: number = tasks.findIndex((item: ITask) => item.id === task.id);

        if (tasks[indTask]) {
            tasks[indTask] = { ...task };

            setCompletedTasks(tasks.filter((item: ITask) => item.completed));
            setNonCompletedTasks(tasks.filter((item: ITask) => !item.completed));
        }

        setSelectedTask(null); 
    }

    const createTask = (task: ITask) => {

        if (task.completed) {
            setCompletedTasks([...completedTasks, { ...task }]);
        } else {
            setNonCompletedTasks([...nonCompletedTasks, { ...task }]);
        }

        setIsOpenCreateModal(false)
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="todo-page">
                <div className="todo-page_header">
                    <h2 className="todo-page_headline">
                        <button className="todo-page_header__back-btn">
                            <Link to="/">
                                Return to Home
                            </Link>
                        </button>
                        TODO APP
                    </h2>
                    <button onClick={() => setIsOpenCreateModal(true)}>Create task</button>
                </div>
                <div className="todo-page_wrapper">
                    <Desk tasks={nonCompletedTasks} delete={(value) => deleteTask(value.id, value.completed)} select={(value) => setSelectedTask(value)}>To Do</Desk>
                    <Desk tasks={completedTasks} delete={(value) => deleteTask(value.id, value.completed)} select={(value) => setSelectedTask(value)}>Completed</Desk>
                </div>
                {selectedTask && 
                <TaskModal titleModal="Edit Task" task={selectedTask} isOpen={!!selectedTask} change={(value) => editTask(value)} close={() => setSelectedTask(null)} />}
                {
                isOpenCreateModal &&
                <TaskModal titleModal="Create Task" isOpen={isOpenCreateModal} change={(value) => createTask(value)} close={() => setIsOpenCreateModal(false)} />
                }
            </div>
        
    )
};

export { AppPage };