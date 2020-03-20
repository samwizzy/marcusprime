import mock from '../mock';

const rolesDB = {
    roles  : [
        {
            'id'            : '15459251a6d6b397565',
            'from'          : {
                'name'  : 'Alice Freeman',
                'avatar': 'assets/images/avatars/alice.jpg',
                'email' : 'alicefreeman@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '28 Jun',
            'read'          : false,
            'starred'       : false,
            'important'     : true,
            'hasAttachments': true,
            'attachments'   : [
                {
                    'type'    : 'image',
                    'fileName': 'flowers',
                    'preview' : 'assets/images/roles/attachment-1.jpg',
                    'url'     : '',
                    'size'    : '1.1Mb'
                },
                {
                    'type'    : 'image',
                    'fileName': 'snow',
                    'preview' : 'assets/images/roles/attachment-2.jpg',
                    'url'     : '',
                    'size'    : '380kb'
                },
                {
                    'type'    : 'image',
                    'fileName': 'sunrise',
                    'preview' : 'assets/images/roles/attachment-3.jpg',
                    'url'     : '',
                    'size'    : '17Mb'
                }
            ],
            'labels'        : [
                1
            ],
            'folder'        : 0
        },
        {
            'id'            : '154588a0864d2881124',
            'from'          : {
                'name'  : 'Lawrence Collins',
                'avatar': 'assets/images/avatars/vincent.jpg',
                'email' : 'lawrencecollins@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '28 Jun',
            'read'          : false,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '15453ba60d3baa5daaf',
            'from'          : {
                'name'  : 'Judith Burton',
                'avatar': 'assets/images/avatars/joyce.jpg',
                'email' : 'judithburton@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '28 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [
                3,
                2
            ],
            'folder'        : 0
        },
        {
            'id'            : '15453a06c08fb021776',
            'from'          : {
                'name'  : 'Danielle Obrien',
                'avatar': 'assets/images/avatars/danielle.jpg',
                'email' : 'danielleobrien@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '28 Jun',
            'read'          : true,
            'starred'       : true,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [
                1,
                3
            ],
            'folder'        : 0
        },
        {
            'id'            : '154537435d5b32bf11a',
            'from'          : {
                'name'  : 'Brian Flores',
                'avatar': '',
                'email' : 'brianflores@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '26 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '1544e43dcdae6ebf876',
            'from'          : {
                'name'  : 'Charles Kim',
                'avatar': 'assets/images/avatars/garry.jpg',
                'email' : 'charleskim@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '18 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : true,
            'hasAttachments': false,
            'labels'        : [
                2
            ],
            'folder'        : 0
        },
        {
            'id'            : '1543ee3a5b43e0f9f45',
            'from'          : {
                'name'  : 'Patricia White',
                'avatar': '',
                'email' : 'patriciawhite@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '15 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '1543cc4515df3146112',
            'from'          : {
                'name'  : 'Juan Carpenter',
                'avatar': 'assets/images/avatars/james.jpg',
                'email' : 'juancarpenter@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '11 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '154398a4770d7aaf9a2',
            'from'          : {
                'name'  : 'Maria Gilbert',
                'avatar': 'assets/images/avatars/danielle.jpg',
                'email' : 'mariagilbert@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '5 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '15438351f87dcd68567',
            'from'          : {
                'name'  : 'Tammy Brooks',
                'avatar': '',
                'email' : 'tammybrooks@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
            'time'          : '1 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '1542d75d929a603125',
            'from'          : {
                'name'  : 'Kathy Price',
                'avatar': '',
                'email' : 'kathyprice@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
            'time'          : '1 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '1541ca7af66da284177',
            'from'          : {
                'name'  : 'Alan Coleman',
                'avatar': '',
                'email' : 'alancoleman@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
            'time'          : '28 June',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '154297167e781781745',
            'from'          : {
                'name'  : 'Thomas Silva',
                'avatar': '',
                'email' : 'thomassilva@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
            'time'          : '16 Jun',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 0
        },
        {
            'id'            : '15427f4c1b7f3953234',
            'from'          : {
                'name'  : 'Jessica Robertson',
                'avatar': '',
                'email' : 'jessicarobertson@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
            'time'          : '19 May',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 3
        },
        {
            'id'            : '154204e45a59b168453',
            'from'          : {
                'name'  : 'John Palmer',
                'avatar': '',
                'email' : 'johnpalmer@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
            'time'          : '8 May',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 3
        },
        {
            'id'            : '1541dd1e05dfc439216',
            'from'          : {
                'name'  : 'David Butler',
                'avatar': '',
                'email' : 'davidbutler@creapond.com'
            },
            'to'            : [
                {
                    'name' : 'me',
                    'email': 'johndoe@creapond.com'
                }
            ],
            'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
            'time'          : '7 May',
            'read'          : true,
            'starred'       : false,
            'important'     : false,
            'hasAttachments': false,
            'labels'        : [],
            'folder'        : 3
        }
    ],
    folders: [
        {
            'id'    : 0,
            'handle': 'inbox',
            'title' : 'Inbox',
            'icon'  : 'inbox'
        },
        {
            'id'    : 1,
            'handle': 'sent',
            'title' : 'Sent',
            'icon'  : 'send'
        },
        {
            'id'    : 2,
            'handle': 'drafts',
            'title' : 'Drafts',
            'icon'  : 'email_open'
        },
        {
            'id'    : 3,
            'handle': 'spam',
            'title' : 'Spam',
            'icon'  : 'error'
        },
        {
            'id'    : 4,
            'handle': 'trash',
            'title' : 'Trash',
            'icon'  : 'delete'
        }
    ],
    filters: [
        {
            'id'    : 0,
            'handle': 'starred',
            'title' : 'Starred',
            'icon'  : 'star'
        },
        {
            'id'    : 1,
            'handle': 'important',
            'title' : 'Important',
            'icon'  : 'label'
        }
    ],
    labels : [
        {
            'id'    : 0,
            'handle': 'admin',
            'title' : 'super admin',
            'color' : '#7cb342'
        },
        {
            'id'    : 1,
            'handle': 'staff',
            'title' : 'staff',
            'color' : '#d84315'
        },
        {
            'id'    : 2,
            'handle': 'admin',
            'title' : 'admin',
            'color' : '#607d8b'
        },
        {
            'id'    : 3,
            'handle': 'regular',
            'title' : 'regular',
            'color' : '#03a9f4'
        },
        {
            'id'    : 4,
            'handle': 'bsm',
            'title' : 'bsm',
            'color' : '#03a9f4'
        },
        {
            'id'    : 5,
            'handle': 'cs',
            'title' : 'cs',
            'color' : '#d84315'
        },
        {
            'id'    : 6,
            'handle': 'rm',
            'title' : 'rm',
            'color' : '#d84315'
        },
    ]
};

mock.onGet('/api/roles-app/role').reply((config) => {
    const params = config.params;
    const response = rolesDB.roles.find((roles) => roles.id === params.rolesId);
    return [200, response];
});

mock.onGet('/api/roles-app/roles').reply((config) => {
    const params = config.params;
    let response = [];

    if ( params.labelHandle )
    {
        const labelId = rolesDB.labels.find(label => label.handle === params.labelHandle).id;

        response = rolesDB.roles.filter((roles) => roles.labels.includes(labelId));
    }
    else if ( params.filterHandle )
    {
        response = rolesDB.roles.filter((roles) => roles[params.filterHandle]);
    }
    else // folderHandle
    {
        let folderHandle = params.folderHandle;
        if ( !folderHandle )
        {
            folderHandle = 'inbox';
        }
        const folderId = rolesDB.folders.find(folder => folder.handle === folderHandle).id;
        response = rolesDB.roles.filter((roles) => roles.folder === folderId);
    }

    return [200, response];
});

mock.onPost('/api/roles-app/update-roles').reply((request) => {
    const roles = JSON.parse(request.data);
    rolesDB.roles = rolesDB.roles.map((_roles) => {
        if ( _roles.id === roles.id )
        {
            return roles;
        }
        return _roles;
    });

    return [200, roles];
});
mock.onGet('/api/roles-app/filters').reply(200, rolesDB.filters);
mock.onGet('/api/roles-app/labels').reply(200, rolesDB.labels);
mock.onGet('/api/roles-app/folders').reply(200, rolesDB.folders);


mock.onPost('/api/roles-app/set-folder').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedrolesIds, folderId} = data;
    rolesDB.roles = rolesDB.roles.map((_roles) => {

        if ( selectedrolesIds.includes(_roles.id) )
        {
            return {
                ..._roles,
                folder: folderId
            };
        }
        return _roles;
    });

    return [200];
});

mock.onPost('/api/roles-app/toggle-label').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedrolesIds, labelId} = data;
    rolesDB.roles = rolesDB.roles.map((_roles) => {
        if ( selectedrolesIds.includes(_roles.id) )
        {
            return {
                ..._roles,
                labels: _roles.labels.includes(labelId) ? _roles.labels.filter(_id => _id !== labelId) : [..._roles.labels, labelId]
            };
        }
        return _roles;
    });

    return [200];
});
mock.onPost('/api/roles-app/delete-roles').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedrolesIds} = data;
    rolesDB.roles = rolesDB.roles.filter((_roles) => selectedrolesIds.includes(_roles.id) ? false : _roles);
    return [200];
});
