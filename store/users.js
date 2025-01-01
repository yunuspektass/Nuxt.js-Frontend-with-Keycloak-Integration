export const state = () => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null
})

export const getters = {
  getUsers: state => state.users,
  getSelectedUser: state => state.selectedUser,
  isLoading: state => state.loading,
  getError: state => state.error
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_SELECTED_USER(state, user) {
    state.selectedUser = user
  },
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get('/User')
      commit('SET_USERS', response.data)
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async getUserByEmail({ commit }, email) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get(`/User/by-email?email=${email}`)
      commit('SET_SELECTED_USER', response.data[0])
      return response.data[0]
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async getUserByUsername({ commit }, username) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get(`/User/by-username?userName=${username}`)
      commit('SET_SELECTED_USER', response.data[0])
      return response.data[0]
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async getUserById({ commit }, id) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get(`/User/${id}`)
      commit('SET_SELECTED_USER', response.data)
      return response.data
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateUser({ commit }, { id, userData }) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.put(`/User/${id}`, userData)
      this.dispatch('users/fetchUsers')
      return response.data
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteUser({ commit }, id) {
    try {
      commit('SET_LOADING', true)
      await this.$axios.delete(`/User/${id}`)
      this.dispatch('users/fetchUsers')
      return true
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async registerUser({ commit }, userData) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.post('/Auth/register', {
        userName: userData.userName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      })
      await this.dispatch('users/fetchUsers')
      return response.data
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}
