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
        password: bcrypt.hashSync("reto123*", 8),
        imageBase64: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0cHgiIGhlaWdodD0iMjgwcHgiIHZpZXdCb3g9IjAgMCAyNjQgMjgwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZXNjPkNyZWF0ZWQgd2l0aCBnZXRhdmF0YWFhcnMuY29tPC9kZXNjPjxkZWZzPjxjaXJjbGUgaWQ9InJlYWN0LXBhdGgtMjczOTQyNyIgY3g9IjEyMCIgY3k9IjEyMCIgcj0iMTIwIj48L2NpcmNsZT48cGF0aCBkPSJNMTIsMTYwIEMxMiwyMjYuMjc0MTcgNjUuNzI1ODMsMjgwIDEzMiwyODAgQzE5OC4yNzQxNywyODAgMjUyLDIyNi4yNzQxNyAyNTIsMTYwIEwyN…g0MDc3MTksOC4xNzIzIDUxLjgwNzQzNDQsOS43MjM5NjY2NyA1My41MDgzMTM3LDEwLjQ1MDk2NjcgQzU1LjYyNjI0NTEsMTEuMzU2NjMzMyA1Ny41MTc0ODE0LDkuNzE0MyA1OS4yMTI2OTMzLDguODU1MyBDNjEuMzgwOTY0Myw3Ljc1NjYzMzMzIDY0LjcxMjA0NzMsNy44NzczIDY2LjcxODk2NDgsOC44NTUzIEM2OC40MjcxNzgzLDkuNjg3OTY2NjcgNzAuMzA1MDc5NywxMS4zNTY2MzMzIDcyLjQyMzM0NDQsMTAuNDUwOTY2NyBDNzQuMTI0MjIzNyw5LjcyMzk2NjY3IDc0LjA5MDg4NjIsOC4xNzIzIDczLjEwOTQzMDIsNy4wMTI2MzMzMyIgaWQ9IkZyYW1lLVN0dWZmIj48L3BhdGg+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48L2c+PC9zdmc+',
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