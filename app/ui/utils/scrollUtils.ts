export const scrollFieldIntoView = (id: string, offset: number = 0) => {
  const field = document.getElementById(id)
  const offsetTop = field?.offsetTop || 0
  if (field) {
    window.scrollTo({ top: offsetTop - 80, behavior: "smooth" })
    // field.scrollIntoView({ behavior: "smooth" })
    // scrollBy({ top: offset, behavior: "smooth" }) // TODO: this needs a little more work.  With this the scrollIntoView wasn't happening
  }
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
