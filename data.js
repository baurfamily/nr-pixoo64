import fetch from 'cross-fetch'

const entities = async () => {
  const body = JSON.stringify({
    query: `
      query {
        actor {
          entitySearch(query:"accountId = 10671289 AND type IN ( 'APPLICATION', 'MONITOR', 'KEY_TRANSACTION')") {
            results {
              entities {
                name
                guid
                type
                domain
                alertSeverity
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
  console.log(options)

  const resp = await fetch(process.env.GRAPHQL_URI, options).catch(err => {
    console.error(err);
  });

  const result = await resp.json()

  if (result.errors) {
    console.log("Errors: ", result.errors)
    process.exit()
  }
  console.log("Entities found:", result.data.actor.entitySearch.results.entities.length)

  return result.data.actor.entitySearch.results.entities
}

export { entities }
