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
  const res = await fetch(`${SB_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify(data),
  })
  return { ok: res.status === 201 }
}

export async function getPostVisibility(): Promise<Record<string, boolean>> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/post_visibility?select=id,visible`, {
      headers,
      cache: 'no-store',
    })
    if (!res.ok) return {}
    const rows = (await res.json()) as { id: string; visible: boolean }[]
    return Object.fromEntries(rows.map(r => [r.id, r.visible]))
  } catch {
    return {}
  }
}

export async function setPostVisible(id: string, visible: boolean): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/post_visibility`, {
      method: 'POST',
      headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ id, visible, updated_at: new Date().toISOString() }),
    })
    return { ok: res.ok }
  } catch {
    return { ok: false }
  }
}
