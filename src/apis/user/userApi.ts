import { BASE_URL, REDIRECT_URI } from '@/constants';
import { api } from '../axois';

export const userApi = {
  // 카카오 로그인
  GET_KAKAO_LOGIN: `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`,
  // 유저 조회
  GET_MEMBERS: (token: string) =>
    api.get('/api/members', {
      headers: {
        Authorization: token
      }
    }),
  // 닉네임 추가
  PATCH_NICKNAME: (nickname: string, token: string) =>
    api.patch(
      '/api/members/nickname',
      { nickname },
      {
        headers: {
          Authorization: token
        }
      }
    )
};
