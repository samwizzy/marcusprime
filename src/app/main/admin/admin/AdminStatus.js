import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

export const orderStatuses = [
    {
        id   : 1,
        role : 'active',
        color: 'bg-blue-darker text-white'
    },
    {
        id   : 2,
        role : 'active',
        color: 'bg-orange text-black'
    },
    {
        id   : 3,
        role : 'active',
        color: 'bg-blue text-white'
    },
    {
        id   : 4,
        role : 'active',
        color: 'bg-purple text-white'
    },
    {
        id   : 5,
        role : 'active',
        color: 'bg-green-dark text-white'
    },
    {
        id   : 6,
        role : 'active',
        color: 'bg-pink text-white'
    },
    {
        id   : 7,
        name : 'Refunded',
        role : 'active',
        color: 'bg-red text-white'
    },
    {
        id   : 8,
        role : 'active',
        color: 'bg-red-dark text-white'
    },
    {
        id   : 9,
        role : 'active',
        color: 'bg-purple-light text-white'
    },
    {
        id   : 10,
        role : 'active',
        color: 'bg-blue text-white'
    },
    {
        id   : 11,
        role : 'active',
        color: 'bg-blue-dark text-white'
    },
    {
        id   : 12,
        role : 'active',
        color: 'bg-green-darker text-white'
    },
    {
        id   : 13,
        role : 'active',
        color: 'bg-purple-dark text-white'
    },
    {
        id   : 14,
        role : 'active',
        color: 'bg-blue-darker text-white'
    }
];

const AdminStatus = ({name}) => {
    return (
        <div className={classNames("inline text-12 p-4 rounded truncate", _.find(orderStatuses, {id: _.random(1, orderStatuses.length)}).color)}>
            {name}
        </div>
    );
};

export default AdminStatus;
