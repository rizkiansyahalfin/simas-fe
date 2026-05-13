// src/components/error/AppErrorBoundary.tsx

import {
  Component,
  type ReactNode,
} from 'react'

import ErrorState from '../states/ErrorState'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <ErrorState
            title="Aplikasi Mengalami Error"
            description="Silakan refresh halaman atau coba kembali nanti."
          />
        </div>
      )
    }

    return this.props.children
  }
}
