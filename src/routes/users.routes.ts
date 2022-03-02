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
        this.app
            .route('/users')
            .get(
                JwtMiddleware.validJWTNeeded,
                PermissionMiddleware.permissionFlagRequired(
                    PermissionFlag.ADMIN_PERMISSION
                ),
                UsersController.getAll
            )
            .post(
                body('firstName')
                    .isString()
                    .withMessage('Firstname is required'),
                body('lastName').isString().withMessage('Lastname is required'),
                body('email')
                    .isEmail()
                    .normalizeEmail()
                    .withMessage('Invalid email format'),
                body('phoneNumber')
                    .isString()
                    .withMessage('Phone number is required')
                    .isMobilePhone(['en-UG', 'en-KE', 'en-TZ', 'en-RW'])
                    .withMessage('Invalid phone number'),
                body('password')
                    .matches(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/)
                    .withMessage(
                        'Password should be atleast 6 to 16 characters and should contain atleast' +
                            ' one lowercase, uppercase, numeric and special character.'
                    ),
                BodyValidationMiddleware.verifyBodyFields,
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.create
            );

        this.app.param('id', UsersMiddleware.extractUserId);

        this.app
            .route('/users/:id')
            .all(
                UsersMiddleware.validateUserExists,
                JwtMiddleware.validJWTNeeded,
                PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(UsersController.getById)
            .delete(UsersController.deleteById);

        this.app.route('/users/:id').patch(
            body('firstName').isString().optional(),
            body('lastName').isString().optional(),
            body('email')
                .isEmail()
                .optional()
                .withMessage('Invalid email format'),
            body('password')
                .matches(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/)
                .optional()
                .withMessage(
                    'Password should be atleast 6 to 16 characters and should contain atleast' +
                        ' one lowercase, uppercase, numeric and special character.'
                ),
            body('permissionFlag').isInt().optional(),
            BodyValidationMiddleware.verifyBodyFields,
            UsersMiddleware.validatePatchEmail,
            UsersController.patchById
        );

        return this.app;
    }
}
