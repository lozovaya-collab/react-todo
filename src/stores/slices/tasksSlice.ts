import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTodos } from "../asyncThunks/tasksThunk";
import { FulfilledAction, PendingAction, RejectedAction } from "../typedStore";
import type { ITask } from "../../views/AppPage/types";

export interface ITaskState {
  tasks: ITask[];
  completedTasks: ITask[];
  nonCompletedTasks: ITask[];
  isLoading: boolean;
  isError: string | null;
}

export const initialState: ITaskState = {
  tasks: [],
  completedTasks: [],
  nonCompletedTasks: [],
  isLoading: false,
  isError: null
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getLists(state, { payload }: PayloadAction<ITask[]>) {
      const arrCompleted: ITask[] = [];
      const arrNonCompleted: ITask[] = [];

      payload.forEach((item: ITask) => {
        if(item.completed){
          arrCompleted.push(item);
        } else {
          arrNonCompleted.push(item);
        }
      });

      return {
        ...state,
        completedTasks: [...arrCompleted],
        nonCompletedTasks: [...arrNonCompleted]
      }
    },
    createTask(state, { payload }: PayloadAction<ITask>) {
      if(payload.completed){
        return {
          ...state,
          completedTasks: [...state.completedTasks, payload]
        }
      } else {
        return {
          ...state,
          nonCompletedTasks: [...state.nonCompletedTasks, payload]
        }
      }
    },
    deleteTask(state, { payload }: PayloadAction<{isCompleted: boolean; taskId: number}>) {
      if(payload.isCompleted){
        return {
          ...state,
          completedTasks: state.completedTasks.filter((item: ITask) => item.id !== payload.taskId)
        }
      } else {
        return {
          ...state,
          nonCompletedTasks: state.nonCompletedTasks.filter((item: ITask) => item.id !== payload.taskId)
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase;
    builder
      .addCase(
        getTodos.fulfilled,
        (state, { payload }: PayloadAction<ITask[]>) => {
          state.tasks = payload;
          
          state.isLoading = false;
        }
      )
      .addCase(getTodos.rejected, (state, { payload }) => {
        state.isError = payload as string;
        state.isLoading = false;
      });
    builder.addMatcher<PendingAction>(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher<FulfilledAction>(
      (action) => action.type.endsWith("/fulfilled"),
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher<RejectedAction>(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.isLoading = false;
      }
    );
  },
});

export const { getLists, createTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer;
