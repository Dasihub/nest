"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGuard = void 0;
const common_1 = require("@nestjs/common");
class UserGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { authorization } = req.headers;
        if (!authorization) {
            throw new common_1.UnauthorizedException({ message: 'Вы не автозиваны', type: 'warn', data: [] });
        }
        const title = authorization.split(' ')[0];
        const token = authorization.split(' ')[1];
        if (title === 'Bearer' && token.length) {
            return true;
        }
        throw new common_1.UnauthorizedException({ message: 'Вы не автозиваны', type: 'warn', data: [] });
    }
}
exports.UserGuard = UserGuard;
//# sourceMappingURL=user.guard.js.map