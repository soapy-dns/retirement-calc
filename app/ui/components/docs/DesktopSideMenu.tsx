import { documentDetails } from "@/app/docs/documentDetails"
import Anchor from "@/app/ui/components/docs/Anchor"

const DesktopSideMenu: React.FC = () => {
  return (
    <div className="flex flex-col mt-10 divide-y divide-primary divide-dashed">
      {Object.values(documentDetails).map((it, index) => {
        return (
          <Anchor key={index} href={it.url} className="leading-8">
            {it.menuText}
          </Anchor>
        )
      })}
    </div>
  )
}
export { DesktopSideMenu }
