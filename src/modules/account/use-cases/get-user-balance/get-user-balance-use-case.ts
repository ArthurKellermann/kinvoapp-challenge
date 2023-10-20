import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../repositories/users-repository';
import { RevenueRepository } from '../../../revenue/repositories/revenue-repository';
import { User } from '../../entities/user';

interface GetUserBalanceRequest {
  id: string;
}

interface GetUserBalanceResponse {
  user: User;
  balance: number;
}

@injectable()
export class GetUserBalanceUseCase {
  constructor(
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
  ) {}

  async execute({
    id,
  }: GetUserBalanceRequest): Promise<GetUserBalanceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User does not exists');
    }

    return { user, balance: user.balance };
  }
}
