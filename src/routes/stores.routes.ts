import { Application } from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../common/routes.config';
import { StoresController } from '../controllers';
import { StoresMiddleware } from '../middlewares';
import JwtMiddleware from '../auth/middlewares/jwt.middleware';
import PermissionMiddleware from '../common/middlewares/permission.middleware';
import { PermissionFlag } from '../common/middlewares/permissionflag.enum';
import BodyValidationMiddleware from '../common/middlewares/body.validation.middleware';

export default class StoresRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'StoresRoutes');
    }

    configureRoutes() {
        this.app
            .route('/stores')
            .get(
                // JwtMiddleware.validJWTNeeded,
                // PermissionMiddleware.permissionFlagRequired(
                //     PermissionFlag.ADMIN_PERMISSION
                // ),
                StoresController.getAll
            )
            .post(
                body('name').isString(),
                body('numberOfEmployees').isNumeric(),
                BodyValidationMiddleware.verifyBodyFields,
                StoresMiddleware.validateRequiredBodyFields,
                StoresController.create
            );

        this.app
            .route('/stores/:id')
            .all(
                StoresMiddleware.validateStoreExists
                // JwtMiddleware.validJWTNeeded,
                // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(StoresController.getById)
            .delete(StoresController.deleteById);

        this.app
            .route('/stores/:id')
            .patch(
                body('name').isString().optional(),
                body('numberOfEmployees').isNumeric().optional(),
                BodyValidationMiddleware.verifyBodyFields,
                StoresController.patchById
            );

        return this.app;
    }
}
