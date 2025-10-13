export default function Skeleton({ className = '' }) {
  return (
    <div className={`bg-slate-200 rounded-lg animate-pulse shimmer ${className}`} />
  )
}