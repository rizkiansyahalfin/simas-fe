// src/types/lucide-react.d.ts

declare module 'lucide-react' {
  import * as React from 'react'

  export const icons: Record<
    string,
    React.FC<any>
  >

  export const Upload: React.FC<any>
  export const Trash2: React.FC<any>
  export const Pencil: React.FC<any>
  export const AlertTriangle: React.FC<any>
  export const Inbox: React.FC<Any>

  const content: any
  export default content
}