const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const headers = {
  'Content-Type': 'application/json',
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
}

export async function joinWaitlist(email: string): Promise<{ ok: boolean }> {
  const res = await fetch(`${SB_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify({ email }),
  })
  return { ok: res.status === 201 || res.status === 409 }
}

export async function submitContact(data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<{ ok: boolean }> {
  const res = await fetch(`${SB_URL}/functions/v1/send-contact`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  return { ok: res.ok }
}
