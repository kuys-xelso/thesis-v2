import * as React from "react"
import { cn } from "@/lib/utils"

const FileUploader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border rounded-md p-4", className)}
    {...props}
  />
))
FileUploader.displayName = "FileUploader"

const FileUploaderContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center justify-center gap-2", className)}
    {...props}
  />
))
FileUploaderContent.displayName = "FileUploaderContent"

const FileInput = React.forwardRef(({ className, ...props }, ref) => (
  <input
    type="file"
    ref={ref}
    className={cn("hidden", className)}
    {...props}
  />
))
FileInput.displayName = "FileInput"

const FileUploaderItem = React.forwardRef(({ className, fileName, fileSize, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 p-2 border rounded", className)}
    {...props}
  >
    <div className="flex-1">
      <p className="text-sm font-medium">{fileName}</p>
      {fileSize && <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>}
    </div>
  </div>
))
FileUploaderItem.displayName = "FileUploaderItem"

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export { FileUploader, FileUploaderContent, FileInput, FileUploaderItem }