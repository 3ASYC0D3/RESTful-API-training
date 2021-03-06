const express = require('express');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const { v4: uuid } = require('uuid');
uuid();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.listen(port);

let users = [
    {
    "userId": uuid(),
    "firstName": "Krish",
    "lastName": "Lee",
    "phoneNumber": "123456",
    "emailAddress": "krish.lee@learningcontainer.com"
    },
    {
    "userId": uuid(),
    "firstName": "racks",
    "lastName": "jacson",
    "phoneNumber": "123456",
    "emailAddress": "racks.jacson@learningcontainer.com"
    },
    {
    "userId": uuid(),
    "firstName": "denial",
    "lastName": "roast",
    "phoneNumber": "33333333",
    "emailAddress": "denial.roast@learningcontainer.com"
    },
    {
    "userId": uuid(),
    "firstName": "devid",
    "lastName": "neo",
    "phoneNumber": "222222222",
    "emailAddress": "devid.neo@learningcontainer.com"
    },
    {
    "userId": uuid(),
    "firstName": "jone",
    "lastName": "mac",
    "phoneNumber": "111111111",
    "emailAddress": "jone.mac@learningcontainer.com"
    }
];


app.get('/', (req, res) => {
    res.render('index', { users });
});

app.get('/users', (req, res) => {
    res.render('index', { users });
});

app.get('/users/new', (req, res) => {
    res.render('new')
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    const newUserId = uuid();
    newUser.userId = newUserId;
    users.push(newUser);
    res.redirect('/users');
});

app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.userId == userId);
    res.render('details', { user })
})

app.get('/users/:userId/edit', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.userId == userId);
    res.render('edit', { user });
})

app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    let user = users.find(u => u.userId == userId);
    if (req.body.phoneNumber.length > 0) {
    user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.emailAddress.length > 0) {
    user.emailAddress = req.body.emailAddress;
    }
    if (req.body.firstName.length > 0) {
    user.firstName = req.body.firstName;
    }
    if (req.body.lastName.length > 0) {
    user.lastName = req.body.lastName;
    }
    res.redirect(`/users/${user.userId}`);
})

app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    users = users.filter(u => u.userId !== userId);
    res.redirect('/users');
})


