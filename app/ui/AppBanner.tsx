import Image from "next/image"

// import bluePig from "/blue-pig.png"
export const AppBanner = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Image
        src="/blue-pig.png"
        alt="Retirement project logo"
        className="mx-4 h-10 py-2"
        width={24}
        height={30}
        priority
      />
      <div className="py-1 text-2xl text-primary">The Retirement Project</div>
    </div>
  )
}
