# LARPex-ui

# style

piszemy za pomocą tailwind/daisyui

# env

VITE_API_URL=exampleurl

# sturktura folderów:

## components/

komponenty ogólnego użytku np button

## model

[NAZWA_SERWISU].ts - przechowywanie kluczy do react-query

pisanie zapytań:

### np. /example/123/test

```typescript
// @/model/exampleService.ts
export const exampleKey = (id: string) => ['example', id, 'test']
//

import { exampleKey } from '@/model/exampleService.ts'

const id = 123
const exampleQuery = useQuery({ queryKey: exampleKey(id) })
```

nie trzeba pisać fetchy za każdym razem

## routes

Routy zgodnie z https://reactrouter.com/en/main

## utils.tsx

funkcje wspomagające ogólnego użytku
