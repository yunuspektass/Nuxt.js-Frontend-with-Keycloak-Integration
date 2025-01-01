export const state = () => ({
  userRoles: []
})

export const getters = {
  isAdmin (state, getters, rootState) {
    const roles = rootState.auth.user?.roles ?? []
    return roles.some(role => role.name === 'Admin')
  },

  userRoles (state, getters, rootState) {
    return rootState.auth.user?.roles ?? []
  },

  userData (state, getters, rootState) {
    const user = rootState.auth.user?.user ?? {}
    return {
      email: user.email,
      name: user.firstName,
      username: user.username
    }
  }
}

export const mutations = {
  SET_USER_ROLES (state, roles) {
    state.userRoles = roles
  }
}

export const actions = {
  async onAuthStateChanged ({ commit }, { authUser }) {
    if (!authUser) {
      commit('SET_USER_ROLES', [])
      return
    }

    const roles = authUser.roles ?? []
    commit('SET_USER_ROLES', roles)

    if (roles.some(role => role.name === 'Admin')) {
      await this.$router.push('/admin')
    } else {
      await this.$router.push('/user')
    }
  }
}
