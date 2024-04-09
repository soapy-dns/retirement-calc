import { documentDetails } from "@/app/docs/documentDetails"
import Anchor from "@/app/ui/components/docs/Anchor"

const DesktopSideMenu: React.FC = () => {
  return (
    <div className="flex flex-col mt-10 px-4 divide-y divide-primary py-4">
      {Object.values(documentDetails).map((it, index) => {
        return (
          <Anchor key={index} href={it.url}>
            {it.menuText}
          </Anchor>
        )
      })}
    </div>
  )
}
export { DesktopSideMenu }
