const fetcher = async (url: string, payload?: Record<string, unknown>) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`, {
    method: payload ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    ...(payload && { body: JSON.stringify(payload) }),
  })
  return await data.json()
}

export default fetcher
