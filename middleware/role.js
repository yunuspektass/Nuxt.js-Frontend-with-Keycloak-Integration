export default function ({ store, redirect, route }) {
  if (!store.$auth.loggedIn || route.path === '/login') { return }

  const roles = store.$auth.user?.roles ?? []
  const isAdmin = roles.some(role => role.name === 'Admin')

  if (route.path === '/') {
    console.log('Role check - isAdmin:', isAdmin)
    return isAdmin ? redirect('/admin') : redirect('/user')
  }

  if (route.path.startsWith('/admin') && !isAdmin) {
    console.log('Unauthorized admin access')
    return redirect('/user')
  }
}
