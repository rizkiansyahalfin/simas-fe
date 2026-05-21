// src/types/lucide-react.d.ts

declare module 'lucide-react' {
  import * as React from 'react'

  export const icons: Record<
    string,
    React.FC<unknown>
  >

  export const Upload: React.FC<unknown>
  export const Trash2: React.FC<unknown>
  export const Pencil: React.FC<unknown>
  export const AlertTriangle: React.FC<unknown>
  export const Inbox: React.FC<unknown>

  const content: unknown
  export default content
}