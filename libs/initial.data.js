import bcrypt from 'bcryptjs';

export function dataRole(Role) {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

export function dataUser(User, Role, Op) {
    User.create({
        username: "admin",
        name: "admin",
        email: "ingenio_union@dominio.com",
        password: bcrypt.hashSync("reto123*", 8)
    }).then(user => {
        Role.findAll({
            where: {
                name: {
                    [Op.or]: ["admin"]
                }
            }
        }).then(roles => {
            user.setRoles(roles).then();
        });
    });
}