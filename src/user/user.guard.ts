import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs/internal/Observable'

export class UserGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest()

		const { authorization } = req.headers

		if (!authorization) {
			throw new UnauthorizedException({ message: 'Вы не автозиваны', type: 'warn', data: [] })
		}

		const title = authorization.split(' ')[0]
		const token = authorization.split(' ')[1]

		if (title === 'Bearer' && token.length) {
			return true
		}

		throw new UnauthorizedException({ message: 'Вы не автозиваны', type: 'warn', data: [] })
	}
}
