import { numberFormatter } from "@/app/ui/utils/formatter"

interface GetOptionsProps {
  legendContainerId: string
  redLines?: number[]
}
export const getOptions = ({ legendContainerId, redLines = [] }: GetOptionsProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      htmlLegend: {
        // ID of the container to put the legend in
        containerID: legendContainerId
      },
      legend: {
        display: false
      },
      title: {
        display: false
      },
      annotation: {
        annotations: {}
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year"
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Value (thousands)"
        },
        ticks: {
          callback: function (value: number) {
            const thousandth = value / 1000
            return numberFormatter.format(thousandth)
          }
        }
      }
    }
  }

  interface AnnotationProps {
    type: string
    xMin: number
    xMax: number
    borderColor: string
    borderWidth: number
  }
  const annotations = redLines?.reduce(
    (accum, it, index) => {
      const key = `verticalLine${index}`
      const annotation = {
        type: "line",
        xMin: it,
        xMax: it,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2
      }
      accum[key] = annotation
      return accum
    },
    {} as Record<string, AnnotationProps>
  )

  if (annotations) {
    options.plugins.annotation.annotations = annotations
  }

  return options
}
