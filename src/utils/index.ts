import { removeToken } from '@/storage/token';
// import { Toast, Notification } from '@douyinfe/semi-ui';
import { parse } from 'cookie';
import { visible$, type$ } from '@/streams/config';
import { GetServerSidePropsContext } from 'next';
import { topPages } from './enum';
import useTranslation from '@/hooks/useTranslation';
let notNumLock = false;
export function handleResult(
  result: HttpResult,
  { ignoreError = false, handleErrorCode = null } = {},
) {
  let isErr = false;
  // const num = Math.ceil(Math.random()*10)
  // if(num <= 1){
  //   result.code = 401 
  // }
  if (!ignoreError && result.code !== 200) {
    isErr = true;
    if (handleErrorCode) {
      const res = handleErrorCode(result.code);
      if (res) {
        isErr = false;
      }
    }
    if (result.code === 401) {
      removeToken();
      if (!notNumLock) {
        Notification.error({ title: useTranslation().t('common.expired') });
        notNumLock = true;
        const loginType = localStorage.getItem('loginMethod');
        if (loginType != 'email') {
          let pathname = window.location.pathname;
          const count = (pathname.match(/\//g) || []).length;
          if (count > 1) {
            const pathnameIndex = pathname.lastIndexOf('/');
            pathname = pathname.slice(0, pathnameIndex);
          }
          if (!topPages.includes(pathname)) {
            setTimeout(() => {
              window.location.replace('/');
            }, 3000);
          }
        } else {
          type$.next('loginAgain');
          visible$.next(true);
        }
        setTimeout(() => {
          notNumLock = false;
        }, 3000);
      }
      return Promise.reject(null);
    }
    if (result.code === 32229) {
      // pop up verify
      dispatchEvent(new CustomEvent('VERIFY_POPUPS'));
      return Promise.reject(null);
    }
  }
  if (isErr) {
    console.warn('error:', result);
    if (result.code != 10019) {
      Notification.error({ title: `${result.message} (${result.code})` });
    }
    return Promise.reject(result);
  }
  return result.data;
}

export const hasToken = (ctx: GetServerSidePropsContext) => {
  const { req } = ctx;

  const cookies = req?.headers?.cookie ? parse(req?.headers?.cookie || '') : {};
  const token = cookies.token;
  return token;
};

