import bcrypt from 'bcryptjs'

const users = [
    {name: 'Admin', email: 'admin@example.com', password: bcrypt.hashSync('1234567', 10), isAdmin: true},
    {name: 'Norrico', email: 'norricobiason31@gmail.com', password: bcrypt.hashSync('1234567', 10)},
    {name: 'Yuta', email: 'geraldbiasonjob31@gmail.com', password: bcrypt.hashSync('1234567', 10)},
]
export default users