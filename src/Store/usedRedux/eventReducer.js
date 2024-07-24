// actions
const ADD_EVENT = 'ADD_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

// action creators
export const addEvent = (event) => ({ type: ADD_EVENT, payload: event });
export const updateEvent = (id, event) => ({ type: UPDATE_EVENT, payload: { id, event } });
export const deleteEvent = (id) => ({ type: DELETE_EVENT, payload: id });

// initial state
const initialState = {
  events: []
};

// reducer
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, events: [...state.events, { ...action.payload, id: state.events.length }] };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? { ...action.payload.event, id: event.id } : event
        )
      };
    case DELETE_EVENT:
      return { ...state, events: state.events.filter((event) => event.id !== action.payload) };
    default:
      return state;
  }
};

export default eventReducer;
