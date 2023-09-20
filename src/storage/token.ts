import { ucApi } from '@/api/uc';
import { remove, setCookie } from '@/utils/cookie';
import { token$ } from '@/streams/config';
import axios from 'axios';

const TOKEN_KEY = 'SEEDS_TOKEN';
const INVITE_CODE_KEY = 'INVITE_CODE_KEY';

export function readToken() {
  return token$.getValue();
  //return localStorage.getItem(TOKEN_KEY);
}

export async function writeToken(token) {
  return new Promise(async (res)=>{
    // setCookie('token', token);
    // 加入http only samesite
    await axios.post('/api', {
      token,
    });
    token$.next(token);
    res(true)
    //localStorage.setItem(TOKEN_KEY, token);
  })
}

export async function removeToken() {
  //remove('token');
  //移除token
  await axios.get('/api', {
    params: {},
  });
  token$.next(null);
  //localStorage.removeItem(TOKEN_KEY);
}

export function readInviteCode() {
  return localStorage.getItem(INVITE_CODE_KEY);
}

export function writeInviteCode(token) {
  localStorage.setItem(INVITE_CODE_KEY, token);
}

