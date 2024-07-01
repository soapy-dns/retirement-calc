export const scrollFieldIntoView = (id: string, offset: number = 0) => {
  const field = document.getElementById(id)
  if (field) {
    field.scrollIntoView({ behavior: "smooth" })
    scrollBy({ top: offset, behavior: "smooth" }) // TODO: this needs a little more work.
  }
}
