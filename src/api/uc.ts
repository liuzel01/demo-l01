import http from '@/utils/http';
import { handleResult } from '@/utils';

export const ucApi = {
  // metamask 获取 nonce
  async getMetamaskNonce(params = {}) {
    return handleResult(
      await http.post('/uc/auth/phantom/generate-nonce', { params }),
    );
  },
  // metamask 登录注册
  async metamaskLogin(params = {}) {
    return handleResult(await http.post('/uc/auth/phantom/login', { params }));
  },
}
