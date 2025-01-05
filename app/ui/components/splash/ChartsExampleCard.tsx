import Image from "next/image"

export const ChartsExampleCard: React.FC = () => {
  return (
    <div className={`mb-12 border-2 border-gray-300 rounded-md bg-muted p-6 shadow-lg  overflow-hidden`}>
      <div className="overflow-hidden">
        <h2 className="text-center text-3xl font-semibold mb-8">Charts for a visual view.</h2>
        <div className="relative  mx-auto my-4 fade-img h-64 w-[36rem]">
          <Image
            src="/images/lineChartExample.png"
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
