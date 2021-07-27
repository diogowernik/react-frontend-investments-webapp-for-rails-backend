import { apiHost } from '../../config/apiHost';

// TODO: base

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

// Portfolios 

const deletePortfolio = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfolios/${id}`, {
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

const getPortfolios = () => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfolios`, {
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

const getPortfolio = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfolios/${id}`, {
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

const savePortfolio = (data, id=null) => {
  let apiUrl = `${apiHost}/api/portfolios`
  let apiMethod = 'post'
  if (id) {
    apiUrl = `${apiUrl}/${id}`
    apiMethod = 'put'
  }

  const body = JSON.stringify({
    portfolio: data
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

// Portfoliocriptos

const getPortfoliocriptos = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfolio/portfoliocriptos/${id}`, {
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

const deletePortfoliocripto = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfoliocriptos/${id}`, {
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
const getPortfoliocripto = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfoliocriptos/${id}`, {
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

const savePortfoliocripto = (data, id=null) => {
  let apiUrl = `${apiHost}/api/portfoliocriptos`
  let apiMethod = 'post'
  if (id) {
    apiUrl = `${apiUrl}/${id}`
    apiMethod = 'put'
  }

  const body = JSON.stringify({
    portfoliocripto: data
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

// Porfoliofiis

const getPortfoliofiis = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfolio/portfoliofiis/${id}`, {
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

const deletePortfoliofii = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfoliofiis/${id}`, {
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
const getPortfoliofii = (id) => {
  let response_ok = null
  return fetch(`${apiHost}/api/portfoliofiis/${id}`, {
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

const savePortfoliofii = (data, id=null) => {
  let apiUrl = `${apiHost}/api/portfoliofiis`
  let apiMethod = 'post'
  if (id) {
    apiUrl = `${apiUrl}/${id}`
    apiMethod = 'put'
  }

  const body = JSON.stringify({
    portfoliofii: data
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
  savePortfolio,
  getPortfolio,
  deletePortfolio,
  getPortfolios,
  getPortfoliocriptos,
  deletePortfoliocripto,
  getPortfoliocripto,
  savePortfoliocripto,
  getPortfoliofiis,
  deletePortfoliofii,
  getPortfoliofii,
  savePortfoliofii,

}
