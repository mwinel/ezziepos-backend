import { Request, Response, NextFunction } from 'express';
import { PermissionFlag } from './permissionflag.enum';

class PermissionMiddleware {
    // Checks for whatever permission flag is we pass it.
    permissionFlagRequired(requiredPermissionFlag: PermissionFlag) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const userPermissionFlag = parseInt(
                    res.locals.jwt.permissionFlag
                );
                if (userPermissionFlag & requiredPermissionFlag) {
                    next();
                } else {
                    res.status(403).send();
                }
            } catch (e) {
                console.log(e);
            }
        };
    }

    async onlySameUserOrAdminCanDoThisAction(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const userPermissionFlag = parseInt(res.locals.jwt.permissionFlag);
        if (
            req.params &&
            req.params.id &&
            req.params.id === res.locals.jwt.id
        ) {
            return next();
        } else {
            if (userPermissionFlag & PermissionFlag.ADMIN_PERMISSION) {
                return next();
            } else {
                return res.status(403).send();
            }
        }
    }
}

export default new PermissionMiddleware();
