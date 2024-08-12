import {
  checkPermission,
  Permission,
  RequestPermission,
  requestPermission
} from "../../core"
import { useCallback } from 'react'

const policyUrls: Partial<{ [key in Permission]: string }> = {
  camera: 'https://metanode.co/privacy#sharing',
  micro: 'https://metanode.co/privacy#sharing'
}

const usePermissions = (logo?: string) => {
  const handleCheckPermission = useCallback(
    async ({
      permission,
      description,
      title
    }: Omit<Partial<RequestPermission>, 'policy'> & { permission: Permission }) => {
      try {
        if (!permission) {
          throw new Error('Permission is required');
        }
        const { status } = await checkPermission(permission)
        if (status === 1) return //status 0 or 2 is denied
        const { success, granted } = await requestPermission({
          permission: permission || 'camera',
          description:
            description ||
            `We will need your ${permission} to give you better experience.`,
          logo: logo || '',
          policy: policyUrls?.[permission] || 'https://metanode.co/privacy',
          title: title || `Allow your ${permission}`
        })
        if (!success || !granted) throw new Error('Permission denied!')
      } catch (error) {
        throw error
      }
    },
    []
  )

  return handleCheckPermission
}

export default usePermissions
