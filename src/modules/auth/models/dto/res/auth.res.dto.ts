import { UserResDto } from '../../../../users/models/dto/res/user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  tokenPair: TokenPairResDto;
  user: UserResDto;
}
