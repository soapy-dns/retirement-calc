import { Pig } from "@/components/ui/icons/Pig"

export const AppBanner = () => {
  return (
    <div className="flex items-center justify-center bg-muted gap-2">
      <Pig />
      <div className="py-1 text-2xl text-primary-foreground ">The Retirement Project</div>
    </div>
  )
}
