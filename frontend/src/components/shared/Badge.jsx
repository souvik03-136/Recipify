export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white',
    secondary: 'bg-blue-100 text-blue-700',
    outline: 'border border-slate-200 text-slate-600',
    success: 'bg-green-100 text-green-700'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}