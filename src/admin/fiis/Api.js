import { apiHost } from '../../config/apiHost.js';

// TODO: base fiis url

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const collectErrors = (response) => {
  let errors = []

  if (response.status === 404) {
    errors.push(response.error)
    return errors
  }

  const fields = Object.keys(response)
  fields.forEach(field => {
    const prefix = capitalizeFirstLetter(field)
    response[field].forEach(message => {
      errors.push(`${prefix} ${message}`)
    })
  })
  return errors
}

const deleteFii = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/fiis/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      response_ok = response.ok
      if (response.status === 204) {
        return ''
      } else {
        return response.json()
      }
    })
    .then(response => {
      if (response_ok) {
        return [false, response]
      } else {
        return [true, collectErrors(response)]
      }
    })
}

const getFiis = () => {
  let response_ok = null
  return fetch(`${apiHost}/api/fiis`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      response_ok = response.ok
      return response.json()
    })
    .then(response => {
      if (response_ok) {
        return [false, response]
      } else {
        return [true, collectErrors(response)]
      }
    })
}

const getFii = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/fiis/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      response_ok = response.ok
      return response.json()
    })
    .then(response => {
      if (response_ok) {
        return [false, response]
      } else {
        return [true, collectErrors(response)]
      }
    })
}

const saveFii = (data, id = null) => {
  let apiUrl = `${apiHost}/api/fiis`
  let apiMethod = 'post'
  if (id) {
    apiUrl = `${apiUrl}/${id}`
    apiMethod = 'put'
  }

  const body = JSON.stringify({
    fii: data
  })

  let response_ok = null
  return fetch(apiUrl, {
    method: apiMethod,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  })
    .then(response => {
      response_ok = response.ok
      return response.json()
    })
    .then(response => {
      if (response_ok) {
        return [false, null]
      } else {
        return [true, collectErrors(response)]
      }
    })
}
export {
  saveFii,
  getFii,
  deleteFii,
  getFiis
}