import { useWriteContract } from 'wagmi'
import { isError } from "ethers"
import { config } from "@/lib/config"
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FunctionComponent, ReactNode } from "react"
import { backend } from "@/lib/backend"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon, UserIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { contracts } from '@/lib/contracts'
import { auth } from "@/lib/auth"

export const Provider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { status, retry } = auth.hooks.useAuth()
  const isOnboarding = status === 'onboarding'
  console.log(status, isOnboarding)

  const completed = () =>
    retry()

  return (
    <>
      <Dialog open={isOnboarding} showCloseBtn={false}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Hi friend 👋
            </DialogTitle>
            <DialogDescription>
              We noticed you haven't yet created an account
            </DialogDescription>
          </DialogHeader>
          <OnboardingForm completed={completed} />
        </DialogContent>
      </Dialog>
      {children}
    </>
  )
}

const FormSchema = z.object({
  username: z.string().refine(username => username.startsWith('@') ? username.slice(1) : username),
  name: z.string(),
  bio: z.string(),
  profilePicture: z.instanceof(File),
})

type FormSchema = z.infer<typeof FormSchema>

const OnboardingForm: FunctionComponent<{ completed: () => Promise<unknown> }> = ({ completed }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      name: "",
      bio: "",
    }
  })

  const { toast } = useToast()

  const { writeContract, status } = useWriteContract()
  const { mutate: uploadFile, status: uploadFileStatus } = backend.hooks.useUploadFile()

  const storeDataOnChain = (data: Omit<FormSchema, 'profilePicture'> & { profilePictureHash: string }) => {
    writeContract({
      abi: contracts.abi.podfi,
      address: config.podfi.contractAddress as any,
      functionName: "registerUser",
      args: [data.username, data.name, data.bio, data.profilePictureHash]
    }, {
      onSuccess: async () => {
        toast({
          title: 'Account created',
          description: 'Account created successfully'
        })
        await completed()
      },
      onError: err => {
        if (err.name === 'ContractFunctionExecutionError') {
          if ((err.walk() as any).reason === 'USER_ALREADY_EXISTS')
            return toast({
              title: "Username taken",
              description: "Username taken",
              variant: "destructive"
            })
        }

        console.log(err)

        toast({
          title: "Unknown error",
          description: (err as Error).message,
          variant: "destructive"
        })
      }
    })
  }

  const onSubmit = async (form: FormSchema) => {
    uploadFile({ file: form.profilePicture },
      {
        onSuccess: (data) => {
          storeDataOnChain({ ...form, profilePictureHash: data })
        },
        onError: (err) => {
          toast({
            title: "File upload failed",
            description: err.message,
            variant: 'destructive'
          })
        }
      })

  }

  const isSubmitting = form.formState.isSubmitting
    || status === 'pending'
    || uploadFileStatus === 'pending'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    form.setValue('profilePicture', e.target.files!.item(0)!)
                  }}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="@username"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (
                <Loader2Icon className="animate-spin size-6" />
              )
              : (
                <>
                  <UserIcon className="size-6 mr-2" />
                  Create Account
                </>
              )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

