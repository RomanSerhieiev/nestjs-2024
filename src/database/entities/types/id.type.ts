import { EEntity } from '../enums/entity.enum';
import { Opaque } from './opaque.type';

export type ArticleID = Opaque<string, EEntity.ARTICLES>;
export type ArticleToTagID = Opaque<string, EEntity.ARTICLES_TO_TAGS>;
export type CommentID = Opaque<string, EEntity.COMMENTS>;
export type FollowID = Opaque<string, EEntity.FOLLOWS>;
export type LikeID = Opaque<string, EEntity.LIKES>;
export type RefreshTokenID = Opaque<string, EEntity.REFRESH_TOKENS>;
export type TagID = Opaque<string, EEntity.TAGS>;
export type UserID = Opaque<string, EEntity.USERS>;
