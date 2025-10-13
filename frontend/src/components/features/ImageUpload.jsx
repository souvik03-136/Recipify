import { useState, useRef } from 'react'
import { Camera, Upload, X, Loader } from 'lucide-react'
import Button from '../shared/Button'
import { useImageAnalysis } from '../../hooks/useImageAnalysis'

export default function ImageUpload({ onAnalysisComplete }) {
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)
  const { analyze, loading, error } = useImageAnalysis()

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!preview) return
    
    const result = await analyze(preview)
    if (result) {
      onAnalysisComplete(result.detectedIngredients)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Upload Ingredient Photo</h2>
      </div>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-900 mb-1">
                Click to upload photo
              </p>
              <p className="text-sm text-slate-500">
                JPG, PNG up to 10MB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full max-h-96 object-contain bg-slate-50"
            />
            <button
              onClick={clearPreview}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Analyze Ingredients
                </>
              )}
            </Button>
            <Button variant="outline" onClick={clearPreview}>
              Change Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}