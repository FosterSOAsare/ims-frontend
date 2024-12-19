const userHasPermission = (userPermissions: string[], permissionName: string, access: string) => {

  const exists = userPermissions?.find(per => per.toLowerCase().startsWith(permissionName.toLowerCase()))
  if (!exists) return false

  // Check access 
  return (new RegExp(access, 'i').test(exists))
}

export default userHasPermission