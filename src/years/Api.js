import { apiHost } from '../apiHost.js';

// TODO: base years url

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

const deleteYear = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/years/${id}`, {
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

const getYears = () => {
  let response_ok = null
  return fetch(`${apiHost}/api/years`, {
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

const getYear = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/years/${id}`, {
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

const saveYear = (data, id=null) => {
  let apiUrl = `${apiHost}/api/years`
  let apiMethod = 'post'
  if (id) {
    apiUrl = `${apiUrl}/${id}`
    apiMethod = 'put'
  }

  const body = JSON.stringify({
    year: data
  })

  let response_ok = null
  return fetch(apiUrl, {
    method: apiMethod,
    headers: {
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
  saveYear,
  getYear,
  deleteYear,
  getYears
}


