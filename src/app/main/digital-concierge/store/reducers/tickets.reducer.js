import * as Actions from '../actions';

const initialState = {
    data: [],
    ticket: {},
    comment: {},
    widgets: {},
    projects: [],
    form: {
        requestName: '',
        description: '',
        dept: {id: '', name: ''},
        status: ''
    },
    composeDialog: false,
    commentDialog: false,
    selectedCommentIds: [],
    searchText: ''
}

const ticketsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_TICKETS:
            return {
                ...state,
                data: action.payload
            }
        case Actions.GET_WIDGETS:
            return {
                ...state,
                widgets: action.payload
            };    
        case Actions.GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };    
        case Actions.TICKETS_BY_STATUS:
            return {
                ...state,
                data: action.payload
            }
        case Actions.TICKETS_BY_NEW_STATUS:
            return {
                ...state,
                new: action.payload
            }
        case Actions.TICKETS_BY_PROGRESS_STATUS:
            return {
                ...state,
                progress: action.payload
            }
        case Actions.TICKETS_BY_CLOSED_STATUS:
            return {
                ...state,
                closed: action.payload
            }
        case Actions.GET_TICKET:
            return {
                ...state,
                ticket: action.payload,
                mode: action.mode
            }
        case Actions.UPDATE_TICKET:
            return {
                ...state,
                mode: action.mode,
                composeDialog: action.status
            }
        case Actions.UPDATE_STATUS:
            return {
                ...state,
                ticket: action.payload,
                mode: action.mode,
                composeDialog: action.status
            }
        case Actions.OPEN_TICKET_STATUS_DIALOG:
            return {
                ...state,
                ticket: action.payload,
                mode: action.mode,
                composeDialog: action.status
            }
        case Actions.TICKET_SUCCESS:
            return {
                ...state,
                composeDialog: action.status
            }
        case Actions.OPEN_ESCALATE_TICKET_DIALOG:
            return {
                ...state,
                ticket: action.payload,
                mode: action.mode,
                commentDialog: action.status
            }
        case Actions.ESCALATE_TICKET:
            return {
                ...state,
                commentDialog: action.status
            }
        case Actions.NEW_TICKET:
            return {
                ...state,
                mode: action.mode,
                composeDialog: action.status
            }
        case Actions.NEW_COMMENT:
            return {
                ...state,
                mode: action.mode,
                commentDialog: action.status
            }
        case Actions.CLOSE_TICKET_DIALOG:
            return {
                ...state,
                mode: action.mode,
                composeDialog: action.status
            }
        case Actions.CLOSE_COMMENT_DIALOG:
            return {
                ...state,
                mode: action.mode,
                commentDialog: action.status
            }
        case Actions.GET_COMMENT:
            return {
                ...state,
                comment: action.payload
            }
        case Actions.OPEN_COMMENT_FORM:
            return {
                ...state,
                ticket: action.payload,
                mode: action.mode
            }
        case Actions.SELECT_ALL_COMMENTS:
            {
                const { comments } = state.ticket
                console.log(comments, "You jusy hit the tickets reducer on Select all comments")
    
                const selectedCommentIds = comments.map(comment => comment.id);
    
                return {
                    ...state,
                    selectedCommentIds
                };
            }
        case Actions.DESELECT_ALL_COMMENTS:
            {
                return {
                    ...state,
                    selectedCommentIds: []
                };
            }        
        case Actions.TOGGLE_IN_SELECTED_COMMENTS:
            {

                const commentId = action.commentId;

                let selectedCommentIds = [...state.selectedCommentIds];

                if ( selectedCommentIds.find(id => id === commentId) !== undefined )
                {
                    selectedCommentIds = selectedCommentIds.filter(id => id !== commentId);
                }
                else
                {
                    selectedCommentIds = [...selectedCommentIds, commentId];
                }

                return {
                    ...state,
                    selectedCommentIds
                };
            } 
        default:
            return state;
    }
};

export default ticketsReducer;
