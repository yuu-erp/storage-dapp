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
