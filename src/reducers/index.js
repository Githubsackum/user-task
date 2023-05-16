import { combineReducers } from 'redux';
import { DRAG_TASK, MARK_TASK_COMPLETED } from '../actions';

// Initial state
const initialState = {
  lists: [],
};

// Reducer for task lists
const listsReducer = (state = initialState.lists, action) => {
  switch (action.type) {
    case DRAG_TASK:
      const { taskId, sourceListId, targetListId } = action.payload;
      // Find the source and target lists in state
      const sourceList = state.find((list) => list.id === sourceListId);
      const targetList = state.find((list) => list.id === targetListId);
      // Find the task being dragged
      const draggedTask = sourceList.tasks.find((task) => task.id === taskId);
      // Remove the task from the source list
      sourceList.tasks = sourceList.tasks.filter((task) => task.id !== taskId);
      // Add the task to the target list
      targetList.tasks.push(draggedTask);
      return [...state];

    case MARK_TASK_COMPLETED:
      const { taskId } = action.payload;
      // Loop through the lists to find the task
      state.forEach((list) => {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      });
      return [...state];

    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  lists: listsReducer,
});

export default rootReducer;
