import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { VideoIcon, Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/(page)/_page/profile/$username/create')({
  component: CreatePodcastPage
})

function CreatePodcastPage() {
  return (
    <SetupPodcastDialog />
  )
}

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  videoEnabled: z.boolean(),
})

type FormSchema = z.infer<typeof FormSchema>

const SetupPodcastDialog = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} showCloseBtn={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Podcast Setup
          </DialogTitle>
        </DialogHeader>
        <SetupPodcastForm />
      </DialogContent>
    </Dialog>
  )
}

const SetupPodcastForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      videoEnabled: true
    }
  })

  const onSubmit = () => { }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Faye's Galore"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell your fans more about this podcast"
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
          name="videoEnabled"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch />
                  Enable Video
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button className="w-full gap-2" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? (
                <Loader2Icon className="animate-spin size-6" />
              ) : (
                <>
                  <VideoIcon
                    className="size-6"
                  />
                  Start
                </>
              )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
