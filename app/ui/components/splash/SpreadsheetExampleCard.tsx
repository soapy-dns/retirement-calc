import Image from "next/image"

export const SpreadsheetExamplesCard: React.FC = () => {
  return (
    <div className={`mb-8 border-2 border-gray-300 rounded-md bg-muted p-6 shadow-lg mx-24 overflow-hidden`}>
      <div className="overflow-hidden">
        <h2 className="text-center text-3xl font-semibold mb-8">Spreadsheet for in-depth analysis</h2>
        <div className="relative  mx-auto my-4 fade-img h-64 w-[36rem]">
          <Image
            src="/images/spreadsheetDesktopExample.png"
            alt=""
            layout="fill"
            objectFit="cover"
            className="relative object-left-top object-cover "
          />
        </div>
      </div>
    </div>
  )
}
