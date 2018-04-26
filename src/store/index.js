import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
    username: '',
    results: []
}

const mutations = {
    addMessage (state, message) {
      state.results.push(message)
    },
    setUsername (state, username) {
      state.username = username
    }
}

const actions = {
  search: ({ commit, dispatch, state }, query) => {
    search(query).then(items => {
      if (items.length) {
        // state.results.push(...res.items)
        state.results = items
      }
    })
  }
}

const getters = {
    logReversed (state) {
      return state.results.slice().reverse()
    }
}
const serialize = (obj) => (Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&'))

function search (config) {

  const items = []

  const params = {
    key: 'AIzaSyC214Qoy9yIOf6ClpM7etNVMBrdKaasr3o',
    cx: '012007506164570321240:_-vvuuvwabc',
    filter: 1,
    searchType: 'image',
    q: config.query,
    siteSearch: config.site
  }

  return ajaxFetch(params)
    .then(res => {
      items.push(...res.items)
      const nextPage = res.queries.nextPage.pop()
      if (nextPage) {
        return ajaxFetch({ ...params, startIndex: nextPage.startIndex })
          .then(res => {
            items.push(...res.items)
            return items
          })
      } else {
        return items
      }
    })

}

function ajaxFetch (params, items) {
  const url = 'https://content.googleapis.com/customsearch/v1?'

  let myHeaders = new Headers()
  myHeaders.set('Accept', 'application/json; charset=utf-8n')
  myHeaders.set('Content-Type', 'application/json')

  return fetch(
    url + serialize(params),
    {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    }
  )
  .then(res => res.json())
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
