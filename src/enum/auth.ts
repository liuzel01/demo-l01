export enum Theme {
  light = 'light',
  dark = 'dark',
}

export enum VerifyType {
  metamask = 1,
  email = 2,
  ga = 3,
}

export enum VerifyUseType {
  bindEmail = 'BIND_EMAIL',
  bindPhone = 'BIND_PHONE',
  bindPhantom = 'BIND_PHANTOM',
  changeEmail = 'CHANGE_EMAIL',
  changePassword = 'CHANGE_PASSWORD',
  changeLoginPassword = 'CHANGE_LOGIN_PASSWORD',
  liteLogin = 'LITE_LOGIN',
  login = 'LOGIN',
  payPasswordReset = 'PAY_PASSWORD_RESET',
  rebindPhone = 'REBIND_PHONE',
  register = 'REGISTER',
  resetGa = 'RESET_GA',
  resetAssetPassword = 'RESET_ASSET_PASSWORD',
  resetLoginPassword = 'RESET_LOGIN_PASSWORD',
  resetPassword = 'RESET_PASSWORD',
  resetPhone = 'RESET_PHONE',
  verifySettingPolicy = 'VERIFY_SETTING_POLICY',
  verifySettingPolicyBindEmail = 'VERIFY_SETTING_POLICY_BIND_EMAIL',
  verifySettingPolicyBindGa = 'VERIFY_SETTING_POLICY_BIND_GA',
  verifySettingPolicyBindPhone = 'VERIFY_SETTING_POLICY_BIND_PHONE',
  verifySettingPolicyDisableEmailPolicy = 'VERIFY_SETTING_POLICY_DISABLE_EMAIL_POLICY',
  verifySettingPolicyDisableGaPolicy = 'VERIFY_SETTING_POLICY_DISABLE_GA_POLICY',
  verifySettingPolicyDisablePhonePolicy = 'VERIFY_SETTING_POLICY_DISABLE_PHONE_POLICY',
  verifySettingPolicyEnableEmailPolicy = 'VERIFY_SETTING_POLICY_ENABLE_EMAIL_POLICY',
  verifySettingPolicyEnableGaPolicy = 'VERIFY_SETTING_POLICY_ENABLE_GA_POLICY',
  verifySettingPolicyEnablePhonePolicy = 'VERIFY_SETTING_POLICY_ENABLE_PHONE_POLICY',
  verifySettingPolicyRebindGa = 'VERIFY_SETTING_POLICY_REBIND_GA',
  verifySettingPolicyRebindPhone = 'VERIFY_SETTING_POLICY_REBIND_PHONE',
  verifySettingPolicyWithdraw = 'VERIFY_SETTING_POLICY_WITHDRAW',
  verifySettingPolicyWithdrawAddAddress = 'VERIFY_SETTING_POLICY_WITHDRAW_ADD_ADDRESS',
}

export enum MetamaskOperate {
  register = 1, // REGISTER
  login = 2, // LOGIN
  bind = 3, // BIND
}

export enum UserType {
  email = 'EMAIL',
  metamask = 'METAMASK',
}

