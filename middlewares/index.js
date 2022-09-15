import { checkDuplicateUsernameOrEmail, checkRolesExisted } from './verifySignUp.js';
import { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } from './authJwt.js';

const middleware = {
    verifySignUp: {
        checkDuplicateUsernameOrEmail,
        checkRolesExisted
    },
    authJwt: {
        verifyToken,
        isAdmin,
        isModerator,
        isModeratorOrAdmin
    }
}

export default middleware;