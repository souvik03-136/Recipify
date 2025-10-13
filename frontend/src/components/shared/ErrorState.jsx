import { AlertCircle } from 'lucide-react'

export default function ErrorState({ message = 'Something went wrong' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Oops!</h3>
      <p className="text-slate-600 max-w-md">{message}</p>
    </div>
  )
}