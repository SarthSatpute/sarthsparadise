import React from 'react'
import NotFound from '@/app/not-found'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getPlayRealmData } from '@/utils/supabase/getPlayRealmData'
import PlayClient from '../PlayClient'
import { updateVisitedRealms } from '@/utils/supabase/updateVisitedRealms'
import { formatEmailToName } from '@/utils/formatEmailToName'

export default async function Play({ params, searchParams }: { params: { id: string }, searchParams: { shareId: string } }) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  console.log('[DEBUG] session:', session)
  console.log('[DEBUG] user:', user)
  console.log('[DEBUG] params.id:', params.id)
  console.log('[DEBUG] searchParams.shareId:', searchParams.shareId)

  if (!session || !user) {
    console.log('[DEBUG] Redirecting to /signin due to no session or user')
    return redirect('/signin')
  }

  const isValidShareId = searchParams.shareId && searchParams.shareId !== 'null'
  console.log('[DEBUG] isValidShareId:', isValidShareId)

  const { data, error } = !isValidShareId
    ? await supabase.from('realms').select('map_data, owner_id, name').eq('id', params.id).single()
    : await getPlayRealmData(session.access_token, searchParams.shareId)

  console.log('[DEBUG] realm data:', data)
  console.log('[DEBUG] realm error:', error)

  // Get profile (skin)
  let skin: string | null = null

  let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('skin')
    .eq('id', user.id)
    .single()

  if (profile && profile.skin) {
    skin = profile.skin
  } else {
    console.log('[DEBUG] No profile found or no skin set. Assigning random skin...')
    const randomSkinNumber = Math.floor(Math.random() * 83) + 1 // 1 to 83
    const randomSkin = `Character_${randomSkinNumber.toString().padStart(3, '0')}`

    const { error: insertError } = await supabase.from('profiles').upsert({
      id: user.id,
      skin: randomSkin
    })

    if (insertError) {
      console.error('[ERROR] Failed to insert default profile:', insertError)
      return <NotFound specialMessage="Could not create user profile." />
    }

    skin = randomSkin
  }

  if (!data || !skin) {
    const message = error?.message || profileError?.message || 'Unknown error.'
    console.log('[DEBUG] Showing NotFound page:', message)
    return <NotFound specialMessage={message} />
  }

  if (isValidShareId && data.owner_id !== user.id) {
    updateVisitedRealms(session.access_token, searchParams.shareId)
  }

  return (
    <PlayClient
      mapData={data.map_data}
      username={formatEmailToName(user.user_metadata.email)}
      access_token={session.access_token}
      realmId={params.id}
      uid={user.id}
      shareId={isValidShareId ? searchParams.shareId : ''}
      initialSkin={skin}
      name={data.name}
    />
  )
}
