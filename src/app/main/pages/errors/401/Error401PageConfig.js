import {FuseLoadable} from '../../../../../@fuse';

export const Error401PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/errors/error-401',
            component: FuseLoadable({
                loader: () => import('./Error401Page')
            })
        }
    ]
};
