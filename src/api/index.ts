import axios from 'axios';
import type { ITask } from '../views/AppPage/types';

export const API = axios.create();

export const URL_APP = 'https://jsonplaceholder.typicode.com/';

const getTodos = async (): Promise<ITask[]> => {
    const { data } = await API.get(`${URL_APP}/todos?userId=1`);
    return data;
};

export { getTodos };

