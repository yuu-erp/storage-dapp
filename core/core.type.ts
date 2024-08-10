export type Permission =
  | 'camera'
  | 'photo'
  | 'micro'
  | 'location'
  | 'read_contacts'
  | 'bluetooth'

export interface RequestPermission {
  logo: string
  permission: Permission
  title: string
  description: string
  policy: string
}
