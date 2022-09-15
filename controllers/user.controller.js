export function allAccess(req, res) {
    res.status(200).send({ mensage: 'Contenido Público.' });
}
export function userBoard(req, res) {
    res.status(200).send({ mensaje: 'Contenido de Usuario.' });
}
export function adminBoard(req, res) {
    res.status(200).send({ mensaje: 'Contenido de Administrador.' });
}
export function moderatorBoard(req, res) {
    res.status(200).send({ mensaje: 'Contenido de Moderador.' });
}