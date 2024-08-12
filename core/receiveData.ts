interface ReceiveData {
  [key: string]: any // Define the type of expected commands and their values
}

export const receiveData: ReceiveData = {
  'download-and-update-background-wallet': -1,
  'get-current-version': -1,
  'close-select-payment-wallet': -1,
  'close-mini-wallet': -1,
  'open-topup': -1,
  'close-topup': -1,
  'expand-music': -1,
  'get-platform': -1,
  'start-live-activity': -1,
  'get-install-referrer': -1,
  stopSendMessageGGWave: -1,
  autoSendMessageGGWave: -1,
  'get-smart-contract': -1,
  'clear-button-bottom': -1,
  'get-image-by-id': -1,
  'get-timezone': -1,
  getTotalTransactionMine: -1,
  'get-miner-history': -1,
  'join-mine': -1,
  claim: -1,
  'get-user-data-storage': -1,
  setMinerSetting: -1,
  'get-wallet': -1,
  getAllWallets: -1,
  'get-view-on-boarding': -1,
  'check-performance': -1,
  updatePasswordLockDApp: -1,
  checkPasswordLockDApp: -1,
  getSeed: -1,
  'get-raw-seed-confirm': -1,
  createWallet: -1,
  'get-node': -1,
  connectNode: -1,
  'scan-qr': -1,
  'get-file-zip': -1,
  'get-balance-wallet': -1,
  'unzip-process': -1,
  'unzip-file': -1,
  'unzip-result': -1,
  'read-abi-file': -1,
  getAllSmartContracts: -1,
  'watch-approve': -1,
  sendTransaction: -1,
  'take-picture': -1,
  getTransaction: -1,
  'read-abi-string': -1,
  getMySetting: -1,
  'backup-data': -1,
  'on-zip-process': -1,
  'on-zip-result': -1,
  'sync-data-to-watch': -1,
  getWhitelistPagination: -1,
  insertWhitelist: -1,
  'delete-whitelist': -1,
  'count-whitelist': -1,
  'copy-clipboard': -1,
  'capture-screen': -1,
  'get-qr-from-image': -1,
  'get-qr-from-camera': -1,
  'get-from-clipboard': -1,
  'select-image': -1,
  'set-pin-code': -1,
  'check-pin-code': -1,
  setStatusBiometric: -1,
  setStatusWatchConfirm: -1,
  tel: -1,
  'register-bottom': -1,
  'register-bottom-off': -1,
  'on-click-submit-button-bottom': -1,
  'select-date': -1,
  'on-select-data': -1,
  'spinner-register-data': -1,
  'event-onError': -1,
  'spinner-close': -1,
  'open-spinner': -1,
  'on-spinner-selected': -1,
  getHiddenWallet: -1,
  'register-js-on-change-url': -1,
  'on-buy-success': -1,
  'open-url': -1,
  'on-load-url': -1,
  'create-wallet-without-confirm': -1,
  executeSmartContract: -1,
  'excute-smart-contract-miner': -1,
  TransactionError: -1,
  'open-ekyc': -1,
  write: -1,
  read: -1,
  'has-device-notch': -1,
  'on-back': -1,
  'check-permission': -1,
  'open-setting-app': -1,
  'open-dapp': -1,
  'request-permission': -1,
  'connect-wallet': -1,
  'exit-app': -1,
  'edit-wallet-ui': -1,
  getAllProfiles: -1,
  loginProfile: -1,
  'delete-profile': -1,
  keccak256: -1,
  'get-biometric-type': -1,
  'read-from-local-storage-referral-info': -1,
  'read-from-local-storage-settings': -1,
  'read-from-local-storage-is-start-screen': -1,
  'read-from-local-storage-mine-setting': -1,
  'read-from-local-storage-main-url': -1,
  'write-to-local-storage': -1,
  'check-referral': -1,
  'get-my-photo': -1,
  getStatusConnected: -1,
  'get-transaction-paginatio': -1,
  getLastTransfer: -1,
  startMine: -1,
  insertProfile: -1,
  updateProfileIsProtected: -1,
  updatePassword: -1,
  checkPassword: -1,
  updateProfile: -1,
  'change-pin-code': -1,
  updateProfileIsHidden: -1,
  updateProfileUserName: -1,
  'resquest-permission': -1,
  getDataDApp: -1,
  getDAppToShare: -1,
  switchAccount: -1,
  'remove-wallet': -1,
  'calculate-usdm': -1,
  withdraw: -1,
  'balance-of-usdm': -1,
  deleteWalletByAddress: -1,
  updatePinCodeHideDApp: -1,
  checkPinCodeHideDApp: -1,
  shareWallet: -1,
  importSharedDApps: -1,
  shareDApp: -1,
  'get-wallet-to-share': -1,
  getImportedDApps: -1,
  getSharedDApps: -1,
  'get-shared-wallets': -1,
  'get-hash': -1,
  'get-backup-files': -1,
  restoreData: -1,
  'on-zip-start': -1,
  'delete-file': -1,
  getWalletAtAddress: -1,
  'get-setting-d-app': -1,
  createSign: -1,
  'get-public-key': -1,
  getAllTokens: -1,
  'insert-token': -1,
  tokenName: -1,
  tokenSymbol: -1,
  tokenDecimals: -1,
  tokenBalance: -1,
  'give-back-deposit': -1,
  getDeviceId: -1,
  'get-contacts': -1,
  'add-contact': -1,
  'send-sms-by-default-app': -1,
  share: -1,
  'set-uuid': -1,
  'get-uuid': -1,
  setIsJoin: -1,
  'unzip-url': -1,
  'on-start-download': -1,
  'on-download-process': -1,
  unzip: -1,
  'read-file-content': -1,
  'on-start-unzip': -1,
  'on-unzip-process': -1,
  'read-from-local-storage-uuid': -1,
  'show-bottom': -1,
  'hiden-bottom': -1,
  'base-claim': -1,
  'on-gg-wave-message': -1,
  stopListenGGWave: -1,
  'token-approve': -1,
  'reload-profile': -1,
  'get-referral-report': -1,
  'get-referral-report-weekly': -1,
  generateInput: -1,
  'deposit-usdt': -1,
  'set-wallet-active-d-app': -1,
  'exit-and-reload-parent': -1,
  'location-change': -1,
  'open-default-browser': -1,
  'close-mail': -1,
  'check-is-online': -1,
  checkOldDeviceIdExists: -1,
  'get-pubKey-encrypt': -1,
  'get-payment-wallet': -1,
  'get-total-payment': -1,
  'confirm-payment': -1,
  'share-data-to-d-app': -1,
  createWalletFromPrivateKey: -1,
  'check-exists-share-data': -1,
  'get-all-share-data': -1,
  'get-all-imported-data': -1,
  'import-shared-data-to-d-app': -1,
  'get-display-mode': -1,
  'insert-list-d-app-wallet-connections': -1,
  'get-list-d-app-wallet-connections-by-bundle-id': -1,
  'get-list-wallet-by-d-app': -1,
  'get-private-key': -1,
  getLockByAddress: -1,
  insertLock: -1,
  updateLockKey: -1,
  'get-lock-by-address': -1,
  'insert-lock': -1,
  'update-lock-key': -1,
  'export-to-csv': -1,
  'update-wallet-lock-time': -1,
  'delete-list-wallet-by-address': -1,
  'get-wallet-pagination': -1,
  'verify-sign': -1,
  'backup-code': -1,
  'restore-code': -1,
  'get-file': -1,

  'open-server-socket': -1,
  'connect-to-server-socket': -1,
  'send-file': -1,
  'close-server-socket': -1,
  getBackupWalletContent: -1,
  'send-file-result': -1,
  'update-wallet-cold-balance': -1,
  'get-profile-notis': -1,
  'dismiss-profile-noti': -1,
  updateMusicServiceInfo: -1,
  'seek-to-position': -1,
  notificationGetUserOnesByProfile: -1,
  notificationUpdateUserOnes: -1,
  'read-from-local-storage-is-screen-explore': -1,
  'backup-wallet': -1,
  getCurrentProfile: -1,
  deleteProfileById: -1,
  logout: -1,
  getAddressFromSeed: -1,
  getWalletPagination: -1,
  getWalletToShare: -1,
  getSharedWallets: -1,
  getWalletDetail: -1,
  getWalletByAddress: -1,
  updateWalletBalanceByAddress: -1,
  updateWalletUI: -1,
  updateWalletPosition: -1,
  deleteWalletById: -1,
  deleteListWalletById: -1,
  deleteListWalletByAddress: -1,
  countWallet: -1,
  getPublicKeyFromDB: -1,
  getPrivateKeyFromDB: -1,
  getSeedFromDb: -1,
  previewAddressFromPrivateKey: -1,
  updateWalletColdBalance: -1,
  insertToken: -1,
  getTokenByAddress: -1,
  getTokenBalance: -1,
  tokenAllowance: -1,
  tokenApprove: -1,
  tokenDecreaseAllowance: -1,
  tokenIncreaseAllowance: -1,
  tokenSupply: -1,
  tokenTransfer: -1,
  tokenTransferFrom: -1,
  insertVisa: -1,
  deleteVisaById: -1,
  updateVisaBalance: -1,
  insertCode: -1,
  deleteCodeByAddress: -1,
  getCodeByAddress: -1,
  getCodesByParentAddress: -1,
  updateCodeBalance: -1,
  deleteLockByAddress: -1,
  updateLockTime: -1,
  updateLockRate: -1,
  getAllTransactions: -1,
  getTransactionPagination: -1,
  getTransactionByHash: -1,
  getTransactionByAddress: -1,
  getLastExecutedSmartContract: -1,
  getTransactionReport: -1,
  updateLastDeviceKey: -1,
  deployDApp: -1,
  getDAppPagination: -1,
  getAllDApps: -1,
  getAllUserApps: -1,
  getDAppByBundleId: -1,
  getDAppById: -1,
  deleteListDAppById: -1,
  getSettingDApp: -1,
  setWalletActiveDApp: -1,
  disconnectWallet: -1,
  getFavoriteApps: -1,
  updateDataDApp: -1,
  deleteDataDApp: -1,
  updateDAppIsHidden: -1,
  getAllHiddenDApps: -1,
  updateDAppIsLocked: -1,
  cloneDApp: -1,
  searchDApp: -1,
  countDApp: -1,
  countSmartContract: -1,
  updateLastTimeOpenDApp: -1,
  filterDApp: -1,
  getMaxFrameId: -1,
  updateDAppDefault: -1,
  updateDAppLogo: -1,
  shareSmartContract: -1,
  importSmartContract: -1,
  createWebShortcut: -1,
  insertReferralFrame: -1,
  insertGroup: -1,
  deleteGroupById: -1,
  deleteWhitelistById: -1,
  countWhitelist: -1,
  checkWhitelistIsExists: -1,
  searchWhitelist: -1,
  insertNotification: -1,
  deleteNotificationById: -1,
  deleteNotificationByBundleId: -1,
  deleteNotificationByProfileId: -1,
  getNotificationById: -1,
  getNotificationsByBundleId: -1,
  getNotificationsByProfileId: -1,
  countNotificationByBundleId: -1,
  countNotificationByProfileId: -1,
  updateNotificationStatus: -1,
  insertNode: -1,
  getAllNodes: -1,
  deleteNodeById: -1,
  updateLastTimeConnectNode: -1,
  initApp: -1,
  readValueFromStorage: -1,
  writeValueToStorage: -1,
  deleteKeyInStorage: -1,
  deleteAllStorage: -1,
  getDeviceInfo: -1,
  createFolder: -1,
  writeToStorage: -1,
  getPasswordFromSeed: -1,
  createHash: -1,
  getDataForWatch: -1,
  encryptAesECDH: -1,
  decryptAesECDH: -1,
  getEncryptedPublicKey: -1,
  convertStringToHex: -1,
  convertHexToString: -1,
  verifySign: -1,
  createECDHPassword: -1,
  connectNodeWithCurrentSetting: -1,
  disconnectNode: -1,
  initConnectionFromMessageSms: -1,
  sendTransactionFromMessageSms: -1,
  deploySmartContract: -1,
  updateReceipt: -1,
  subscribeToAddress: -1,
  getEnsText: -1,
  getEnsCustomText: -1,
  getTransactionAmount: -1,
  stopMine: -1,
  updateNextTimeClaim: -1,
  getContentBackup: -1,
  reverseOldDeviceId: -1,
  setStatusNotification: -1,
  setStatusOfflineMode: -1,
  setStatusVibration: -1,
  setNotification: -1,
  setDarkMode: -1,
  syncDataFromWatch: -1,
  sendMessageGGWave: -1,
  startListenGGWave: -1,
  getMTDBalance: -1,
  getUSDTBalance: -1,
  commitToMainNet: -1,
  withdrawMTD: -1,
  depositUSDT: -1,
  withdrawUSDT: -1,
  deleteTransactionByFromAddress: -1,
  connectError: -1,
  onConnectError: -1,
  'get-token-by-address': -1,
  'read-from-local-storage-tokenPhone': -1,
  'read-from-local-storage-tokenPhoneParse': -1,
  'read-from-local-storage-depositInfoBep20': -1,
  'read-from-local-storage-depositInfoETH': -1,
  'insert-card': -1,
  updateAppsIsStore: -1,
  getBrowserNotificationCount: -1,
  updateBrowserNotificationCount: -1,
  backWorker: -1,
  shareSecretToWatch: -1,
  'read-from-local-storage-conditionLimitWithdraw': -1,
  'unzip-file-restore': -1
}
