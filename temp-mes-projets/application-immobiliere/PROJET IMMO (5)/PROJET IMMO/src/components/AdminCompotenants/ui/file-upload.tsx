"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Label } from "@/components/AdminCompotenants/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  value?: string
  onChange: (file: File | null, preview: string | null) => void
  accept?: string
  maxSize?: number
  className?: string
}

export function FileUpload({
  value,
  onChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]

    if (file.size > maxSize) {
      alert(`Le fichier est trop volumineux. Taille maximale: ${maxSize / (1024 * 1024)}MB`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onChange(file, result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const removeFile = () => {
    setPreview(null)
    onChange(null, null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {preview ? (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-colors",
            dragActive ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/50" : "border-gray-300 dark:border-gray-600",
            "hover:border-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-800/50",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                  Téléchargez une photo d'agence
                </span>
                <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF jusqu'à {maxSize / (1024 * 1024)}MB
                </span>
              </Label>
              <Input
                ref={inputRef}
                id="file-upload"
                type="file"
                className="sr-only"
                accept={accept}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Choisir un fichier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
