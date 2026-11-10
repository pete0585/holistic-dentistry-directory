import { createServiceClient } from '@/lib/supabase/server'
import { createInboundHandler } from '@/lib/directory-inbound'

export const POST = createInboundHandler({
  "tenant": "directories--holistic-dentistry",
  "directory": "holistic-dentistry",
  "domains": [
    "holisticdentalfinder.com",
    "mail.holisticdentalfinder.com"
  ]
}, { db: async () => createServiceClient() })
