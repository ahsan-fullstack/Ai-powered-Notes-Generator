export function FileUpload(e) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = ((e) => res(e.target.result)),
      reader.onerror = rej,
      reader.readAsDataURL(e)
  })
}