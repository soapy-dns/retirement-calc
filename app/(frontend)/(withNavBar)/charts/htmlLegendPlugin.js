const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id)
  let listContainer = legendContainer.querySelector("ul")

  if (!listContainer) {
    listContainer = document.createElement("ul")
    listContainer.className = "grid grid-cols-1 md:grid-cols-2  mt-4"
    // listContainer.className = "grid grid-flow-col auto-cols-max"

    legendContainer.appendChild(listContainer)
  }

  return listContainer
}

export const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID)

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove()
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart)

    items.forEach((item) => {
      const li = document.createElement("li")
      li.style.alignItems = "center"
      li.style.cursor = "pointer"
      li.style.display = "flex"
      li.style.flexDirection = "row"
      li.style.marginLeft = "10px"

      li.onclick = () => {
        const { type } = chart.config
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index)
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex))
        }
        chart.update()
      }

      //   // Color box
      const boxSpan = document.createElement("span")
      boxSpan.style.background = item.fillStyle
      boxSpan.style.borderColor = item.strokeStyle
      boxSpan.style.borderWidth = item.lineWidth + "px"
      boxSpan.style.display = "inline-block"
      boxSpan.style.flexShrink = 0
      boxSpan.style.height = "20px"
      boxSpan.style.marginRight = "10px"
      boxSpan.style.width = "20px"

      //   // Text
      const textContainer = document.createElement("p")
      textContainer.style.color = item.fontColor
      textContainer.style.margin = 0
      textContainer.style.padding = 0
      textContainer.style.textDecoration = item.hidden ? "line-through" : ""

      const text = document.createTextNode(item.text)
      textContainer.appendChild(text)

      li.appendChild(boxSpan)
      li.appendChild(textContainer)
      ul.appendChild(li)
    })
  }
}
