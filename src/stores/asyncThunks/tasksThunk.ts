import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, URL_APP } from "../../api";
import type { ITask } from "../../views/AppPage/types";
import { AxiosError } from "axios";

export const getTodos = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      const data = await API.get<{ allTasks: ITask[] }>(`${URL_APP}/todos?userId=1`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      let message = null;
      if (error instanceof AxiosError) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message || "Error");
    }
  }
);

