export const state = () => ({
  userRoles: []
})

export const mutations = {
  setUserRoles(state, roles) {
    state.userRoles = roles
  }
}

export const actions = {
  async assignRoles({ commit }, { userId, roles }) {
    try {
      await this.$axios.post(`/UserRoles/${userId}/roles`, roles)
    } catch (error) {
      throw new Error('Roller atanamadı: ' + error.message)
    }
  },

  async removeRoles({ commit }, { userId, roles }) {
    try {
      await this.$axios.delete(`/UserRoles/${userId}/roles`, { data: roles })
    } catch (error) {
      throw new Error('Roller kaldırılamadı: ' + error.message)
    }
  },

  async getUserRoles({ commit }, userId) {
    try {
      const response = await this.$axios.get(`/UserRoles/${userId}/roles`)
      commit('setUserRoles', response.data)
      return response.data
    } catch (error) {
      throw new Error('Roller getirilemedi: ' + error.message)
    }
  }
}
