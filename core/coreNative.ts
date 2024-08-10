import { Permission, RequestPermission } from './core.type'
import { SystemCore } from './SystemCore'

export const getAllWallets = async () => {
  try {
    const res = await SystemCore.send({
      command: 'getAllWallets'
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const requestPermission = async (value: RequestPermission) => {
  try {
    const res = await SystemCore.send({
      command: 'requestPermission',
      value
    })
    return res
  } catch (error) {
    throw error
  }
}

export const checkPermission = async (permission: Permission) => {
  try {
    const res = await SystemCore.send({
      command: 'check-permission',
      value: {
        permission
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getMySetting = async () => {
  try {
    const res = await SystemCore.send({
      command: 'getMySetting'
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getActiveWallet = async () => {
  const res = await SystemCore.send({
    command: 'getSettingDApp'
  })
  return res.data
}
