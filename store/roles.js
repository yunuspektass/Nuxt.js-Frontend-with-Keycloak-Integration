export const state = () => ({
  roles: [],
  currentRole: null
})

export const mutations = {
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_CURRENT_ROLE(state, role) {
    state.currentRole = role
  },
  REMOVE_ROLE(state, roleName) {
    state.roles = state.roles.filter(role => role.name !== roleName)
  }
}

export const actions = {
  async fetchRoles({ commit }) {
    try {
      const response = await this.$axios.get('/Roles')
      commit('SET_ROLES', response.data)
    } catch (error) {
      console.error('Roller getirilirken bir hata oluştu:', error)
      throw error
    }
  },

  async createRole({ dispatch }, roleData) {
    try {
      await this.$axios.post('/Roles', roleData)
      await dispatch('fetchRoles')
    } catch (error) {
      console.error('Rol oluşturulurken bir hata oluştu:', error)
      throw error
    }
  },

  async getRoleByName({ commit }, roleName) {
    try {
      const response = await this.$axios.get(`/Roles/${roleName}`)
      commit('SET_CURRENT_ROLE', response.data)
      return response.data
    } catch (error) {
      console.error('Rol adına göre rol getirilirken bir hata oluştu:', error)
      throw error
    }
  },

  async deleteRole({ commit }, roleName) {
    try {
      await this.$axios.delete(`/Roles/${roleName}`)
      commit('REMOVE_ROLE', roleName)
    } catch (error) {
      console.error('Rol silinirken hata oluştu:', error)
      throw error
    }
  }
}
