const fs = require('fs');
const pug = require('pug');
const age = require('./age');

let users = [];

fs.readdirSync('users').forEach((filename) => {
    let id = filename.replace('.json', '');
    let userData = JSON.parse(fs.readFileSync('users/' + filename, 'utf-8'));

    users.push({
        ...{id: id},
        ...userData
    })
});

function buildUserList() {
    let data = {
        base: {
            title: 'Список пользователей',
            pageClass: 'list'
        },
        users: users
    };

    let html = pug.renderFile('layout/list.pug', data);
    fs.writeFileSync('out/list.html', html);
};

function buildUsers() {
    let compileFunc = pug.compileFile('layout/user.pug');

    users.forEach((user) => {
        let data = {
            base: {
                title: user.name,
                pageClass: 'user'
            },
            calcAge: age,
            user: user
        };

        let html = compileFunc(data);
        fs.writeFileSync('out/' + user.id + '.html', html)
    })
};

buildUserList()
buildUsers()