import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}

export default NotFound
