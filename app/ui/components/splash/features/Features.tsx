import Image from "next/image"
import { Calculator, ChartLine, CloudOff, Flag, Footprints, Save, ScrollText, Sheet } from "lucide-react"
import { SplashFeature } from "./SplashFeature"

export const Features: React.FC = () => {
  return (
    <div className={`mb-8 border-2 border-gray-300 rounded-md bg-muted p-6 shadow-lg z-1 mx-24`}>
      <h2 className="text-center text-3xl font-semibold mb-8">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <SplashFeature.Root>
          <h3 className="font-semibold text-primary-foreground">$0</h3>
          <SplashFeature.Text>Free forever.</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <Footprints className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>No tracking or ads.</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <CloudOff className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>We don&apos;t store any of your data.</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <ScrollText className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>Compare different scenarios.</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <Flag className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>Works for AU / UK.</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <ChartLine className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>Charts for easier visualisation</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <Sheet className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>Spreadsheet for in-depth analysis.</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <Calculator className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>Calculates taxes and asset drawdowns.</SplashFeature.Text>
        </SplashFeature.Root>

        <SplashFeature.Root>
          <Save className="text-primary-foreground w-6 h-6 mb-4" />
          <SplashFeature.Text>Export / re-import scenarios locally</SplashFeature.Text>
        </SplashFeature.Root>
      </div>
    </div>
  )
}
