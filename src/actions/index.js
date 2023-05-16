import axios from 'axios';

// Action types
export const DRAG_TASK = 'DRAG_TASK';
export const MARK_TASK_COMPLETED = 'MARK_TASK_COMPLETED';

// Action creators
export const dragTask = (taskId, sourceListId, targetListId) => {
  return async (dispatch) => {
    try {
      // Make API call to update task list id
      const response = await axios.put(`/api/tasks/${taskId}`, { listId: targetListId });
      dispatch({
        type: DRAG_TASK,
        payload: {
          taskId,
          sourceListId,
          targetListId,
        },
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
};

export const markTaskCompleted = (taskId) => {
  return async (dispatch) => {
    try {
      // Make API call to mark task as completed
      const response = await axios.put(`/api/tasks/${taskId}`, { completed: true });
      dispatch({
        type: MARK_TASK_COMPLETED,
        payload: {
          taskId,
        },
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
};
