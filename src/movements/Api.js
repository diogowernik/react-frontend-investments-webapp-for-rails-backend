import { apiHost } from '../apiHost.js';

// TODO: base movements url

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

const deleteMovement = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/movements/${id}`, {
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

const getMovements = () => {
  let response_ok = null
  return fetch(`${apiHost}/api/movements`, {
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

const getMovement = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/movements/${id}`, {
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

const saveMovement = (data, id=null) => {
  let apiUrl = `${apiHost}/api/movements`
  let apiMethod = 'post'
  if (id) {
    apiUrl = `${apiUrl}/${id}`
    apiMethod = 'put'
  }

  const body = JSON.stringify({
    movement: data
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

module.exports = {
  saveMovement: saveMovement,
  getMovement: getMovement,
  deleteMovement: deleteMovement,
  getMovements: getMovements
}
