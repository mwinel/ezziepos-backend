import { Application } from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../common/routes.config';
import { ProductsController } from '../controllers';
import { ProductsMiddleware } from '../middlewares';
import JwtMiddleware from '../auth/middlewares/jwt.middleware';
import PermissionMiddleware from '../common/middlewares/permission.middleware';
import { PermissionFlag } from '../common/middlewares/permissionflag.enum';
import BodyValidationMiddleware from '../common/middlewares/body.validation.middleware';

export default class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'ProductsRoutes');
    }

    configureRoutes() {
        this.app
            .route('/products')
            .get(
                // JwtMiddleware.validJWTNeeded,
                // PermissionMiddleware.permissionFlagRequired(
                //     PermissionFlag.ADMIN_PERMISSION
                // ),
                ProductsController.getAll
            )
            .post(
                body('title').isString(),
                BodyValidationMiddleware.verifyBodyFields,
                ProductsMiddleware.validateRequiredBodyFields,
                ProductsController.create
            );

        this.app
            .route('/products/:id')
            .all(
                ProductsMiddleware.validateProductExists
                // JwtMiddleware.validJWTNeeded,
                // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(ProductsController.getById)
            .delete(ProductsController.deleteById);

        this.app
            .route('/products/:id')
            .patch(
                body('title').isString().optional(),
                BodyValidationMiddleware.verifyBodyFields,
                ProductsController.patchById
            );

        return this.app;
    }
}
