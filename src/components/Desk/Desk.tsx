import type { IPropsDesk } from "./types.ts";
import type { ITask } from "../../views/HomePage/types";
import './Desk.scss';

import { Task } from "../Task/Task";

const Desk = (props: IPropsDesk) => { 
    return (
            <div className="desk">
                <h3 className="desk_title">{props.children}</h3>
                <div className="desk_content">
                    {
                    props.tasks &&
                        props.tasks.map((item: ITask) => {
                            return (   
                                <Task
                                    key={item.id}
                                    task={item}
                                    delete={(value) => props.delete({ id: value.id, completed: value.completed })}
                                    onClick={() => props.select(item)} />
                        )})
                    }
                </div>
            </div>
    )
};

export { Desk };