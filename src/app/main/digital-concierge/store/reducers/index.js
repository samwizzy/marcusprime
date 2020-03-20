import sidebars from './sidebars.reducer';
import user from './user.reducer';
import contacts from './contacts.reducer';
import chat from './chat.reducer';
import department from './department.reducer';
import admins from './admins.reducer';
import tickets from './tickets.reducer';

import mails from './mails.reducer';
import mail from './mail.reducer';
import {combineReducers} from 'redux';

const reducer = combineReducers({
    sidebars,
    user,
    contacts,
    chat,
    department,
    tickets,
    admins,
    mails,
    mail
});

export default reducer;
