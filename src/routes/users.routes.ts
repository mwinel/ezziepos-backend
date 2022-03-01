import { Application } from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../common/routes.config';
import { UsersController } from '../controllers';
import { UsersMiddleware } from '../middlewares';
import JwtMiddleware from '../auth/middlewares/jwt.middleware';
import PermissionMiddleware from '../common/middlewares/permission.middleware';
import { PermissionFlag } from '../common/middlewares/permissionflag.enum';
import BodyValidationMiddleware from '../common/middlewares/body.validation.middleware';

export default class UsersRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        // add actual route configuration here.

        this.app
            .route('/users')
            .get(
                // JwtMiddleware.validJWTNeeded,
                // PermissionMiddleware.permissionFlagRequired(
                //     PermissionFlag.ADMIN_PERMISSION
                // ),
                UsersController.getAll
            )
            .post(
                body('firstName').isString(),
                body('lastName').isString(),
                body('email').isEmail().withMessage('Invalid email format'),
                body('password')
                    .isLength({ min: 6 })
                    .withMessage('Password must be at least 6 characters long'),
                BodyValidationMiddleware.verifyBodyFields,
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.create
            );

        this.app.param('id', UsersMiddleware.extractUserId);

        this.app
            .route('/users/:id')
            .all(
                UsersMiddleware.validateUserExists
                // JwtMiddleware.validJWTNeeded,
                // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(UsersController.getById)
            .delete(UsersController.deleteById);

        this.app
            .route('/users/:id')
            .patch(
                body('firstName').isString().optional(),
                body('lastName').isString().optional(),
                body('email')
                    .isEmail()
                    .optional()
                    .withMessage('Invalid email format'),
                body('password')
                    .isLength({ min: 6 })
                    .optional()
                    .withMessage('Password must be at least 6 characters long'),
                body('permissionFlag').isInt().optional(),
                BodyValidationMiddleware.verifyBodyFields,
                UsersMiddleware.validatePatchEmail,
                UsersController.patchById
            );

        return this.app;
    }
}
