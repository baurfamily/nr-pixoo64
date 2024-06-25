import fetch from 'cross-fetch'

const entities = async (query) => {
  const body = JSON.stringify({
    query: `
      query GetAlertingStatus($query: String) {
        actor {
          entitySearch(query: $query) {
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
    `,
    variables: { query }
  })

  const options = {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': process.env.API_KEY
    }
  }
  console.log(process.env.GRAPHQL_URL)
  console.log(options)

  const resp = await fetch(process.env.GRAPHQL_URL, options).catch(err => {
    console.error(err);
  });

  const result = await resp.json()
  console.log("result", result)

  if (result.errors) {
    console.log("Errors: ", result.errors)
    process.exit()
  }
  // console.log("query: ",)
  console.log("Entities found:", result?.data.actor.entitySearch.results.entities.length)

  return result.data.actor.entitySearch.results.entities
}

export { entities }
