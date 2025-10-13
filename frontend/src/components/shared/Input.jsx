export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-slate-400 ${className}`}
      {...props}
    />
  )
}