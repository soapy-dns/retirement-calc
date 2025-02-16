import { Pig } from "@/components/ui/icons/Pig"

export const AppBanner = () => {
  return (
    <header className="flex items-center justify-center bg-muted gap-2">
      <Pig aria-hidden />
      <div className="py-1 text-2xl text-primary-foreground  font-medium">The Retirement Project</div>
    </header>
  )
}
