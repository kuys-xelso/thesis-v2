"use client"
import {
  useState,
  useRef
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  CloudUpload,
  Paperclip
} from "lucide-react"

import { Card } from "../ui/card"

// The file schema needs to accept File objects, not just strings
const formSchema = z.object({
  uploadFile: z.instanceof(FileList).optional()
});

export default function BatchUpload() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      // Convert FileList to array
      const filesArray = Array.from(fileList);
      setFiles(filesArray);
      // Update form value
      form.setValue("uploadFile", fileList);
    }
  };

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadFile: undefined
    }
  });

  function onSubmit(values) {
    try {
      console.log(values);
      
      // Create a more readable object from the FileList for display
      const filesToDisplay = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(filesToDisplay, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  // Custom file uploader components
  const FileUploader = ({ className, children, ...props }) => (
    <div
      className={cn("border rounded-md", className)}
      {...props}
    >
      {children}
    </div>
  );

  const FileInput = ({ className, children, ...props }) => (
    <div
      className={cn(className)}
      onClick={() => fileInputRef.current?.click()}
      {...props}
    >
      {children}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple={dropZoneConfig.multiple}
         accept=".csv,.xls,.xlsx,.doc,.docx,.pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
      />
    </div>
  );

  const FileUploaderContent = ({ className, children, ...props }) => (
    <div
      className={cn("p-2", className)}
      {...props}
    >
      {children}
    </div>
  );

  const FileUploaderItem = ({ className, children, ...props }) => (
    <div
      className={cn("flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800", className)}
      {...props}
    >
      {children}
    </div>
  );

  return (
    <Card className="p-6 shadow-md bg-white dark:bg-slate-950 w-full h-full"> 
    <div className="mb-4">
      <h2 className="text-lg font-bold">Download File Template</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Download the template file to ensure your data is formatted correctly before uploading.
      </p>
      <Button variant="outline">
        Download Template
      </Button>
    </div>
    
    <div>
      <h2 className="text-lg font-bold">Batch Upload</h2>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="uploadFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <FileUploader className="relative bg-background rounded-lg p-2">
                  <FileInput className="outline-dashed outline-1 outline-slate-500 cursor-pointer">
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        CSV, XLS, OR XLSX
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {files.map((file, i) => (
                          <FileUploaderItem key={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span className="text-sm truncate">{file.name}</span>
                          </FileUploaderItem>
                        ))}
                      </div>
                    )}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Select a file to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={'w-full'}>Upload</Button>
      </form>
    </Form>
  </Card>
  
  )
}