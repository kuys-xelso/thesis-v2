"use client"
import {
  useState
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
  Input
} from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Check,
  ChevronsUpDown
} from "lucide-react"
import { Card } from "../ui/card"

const formSchema = z.object({
  studentLrn: z.string().min(1),
  gradeLevel: z.string(),
  name: z.string().min(1),
  section: z.string(),
  email: z.string().email(),
  academicYear: z.string().min(1)
});


export default function FormStudent() {
  const gradeLevels = [
    { value: "kindergarten", label: "Kindergarten" },
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7" },
    { value: "8", label: "Grade 8" },
    { value: "9", label: "Grade 9" },
    { value: "10", label: "Grade 10" },
    { value: "11", label: "Grade 11" },
    { value: "12", label: "Grade 12" },
  ];

  const sections = [
    { value: "A", label: "Section A" },
    { value: "B", label: "Section B" },
    { value: "C", label: "Section C" },
    { value: "D", label: "Section D" },
  ];
  
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentLrn: "",
      gradeLevel: "",
      name: "",
      section: "",
      email: "",
      academicYear: "",
    },
  });
  
  function onSubmit(values) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card className="p-6 shadow-md bg-white dark:bg-slate-950 w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-4 text-center sm:text-left">Student Upload</h1>
        <h2 className="text-lg font-semibold mb-2 text-center sm:text-left">General Form</h2>
        <p className="text-sm text-muted-foreground text-center sm:text-left">Please fill out the form below to upload a student.</p>
      </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full ">
        
        <div className="grid grid-cols-12 gap-4">
          
        <div className="col-span-6">
            
            <FormField
              control={form.control}
              name="lrn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LRN</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder=""
                    
                    type=""
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              
              <div className="col-span-6">
                
            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder=""
                    
                    type=""
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              
            </div>
            
            <div className="grid grid-cols-12 gap-4">
              
              <div className="col-span-6">
                
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder=""
                    
                    type=""
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              
              <div className="col-span-6">
                <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Grade Level</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          
                        >
                          {field.value
                            ? gradeLevels.find(
                                (level) => level.value === field.value
                              )?.label
                            : "Select grade level"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search grade level..." />
                        <CommandList>
                          <CommandEmpty>No grade level found.</CommandEmpty>
                          <CommandGroup>
                            {gradeLevels.map((level) => (
                              <CommandItem
                                value={level.label}
                                key={level.value}
                                onSelect={() => {
                                  form.setValue("gradeLevel", level.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    level.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {level.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              
            </div>
            
            <div className="grid grid-cols-12 gap-4">
              
              <div className="col-span-6">
                
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder=""
                    
                    type="email"
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              
              <div className="col-span-6">
                <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Section</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          
                        >
                          {field.value
                            ? sections.find(
                                (section) => section.value === field.value
                              )?.label
                            : "Select section"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search section..." />
                        <CommandList>
                          <CommandEmpty>No section found.</CommandEmpty>
                          <CommandGroup>
                            {sections.map((section) => (
                              <CommandItem
                                value={section.label}
                                key={section.value}
                                onSelect={() => {
                                  form.setValue("section", section.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    section.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {section.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              
            </div>
            <Button type="submit">Submit</Button>
          </form>
    </Form>
    </Card>
  )
}