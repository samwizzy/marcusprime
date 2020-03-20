/**
 * Authorization Roles
 */
 
const authRoles = {
    admin    : ['super admin'],
    user     : ['staff', 'user', 'super admin', 'bsm', 'hta', 'rm', 'cs', 'treasury', 'customer service'],
    onlyGuest: ['guest']
}

export default authRoles;
