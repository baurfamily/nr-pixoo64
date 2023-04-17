import fetch from 'cross-fetch'

const entities = async () => {
  const body = JSON.stringify({
    query: `
      query {
        actor {
          entitySearch(query:"type IN ( 'APPLICATION', 'MONITOR', 'KEY_TRANSACTION')") {
            results {
              entities {
                name
                guid
                type
                domain
              }
            }
          }
        }
      }
    `
  })

  const options = {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': process.env.API_KEY
    }
  }

  const resp = await fetch(
    'https://api.newrelic.com/graphql',
    options
  ).catch(err => {
    console.error(err);
  });

  const result = await resp.json()

  return result.data.actor.entitySearch.results.entities
}

console.log(await entities())
