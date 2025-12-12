// export async function addWatermark(buffer: ArrayBuffer): Promise<Buffer> {
//   const sharp = (await import("sharp")).default;
//   const inputBuffer = Buffer.from(buffer)

//   // Создаём водяной знак поверх картинки
//   const watermarked = await sharp(inputBuffer)
//     .composite([{
//       input: Buffer.from(
//         `<svg width="500" height="500">
//           <text x="10" y="50" font-size="48" fill="red" opacity="0.5">© MyApp</text>
//         </svg>`
//       ),
//       gravity: "southeast"
//     }])
//     .png()
//     .toBuffer()

//   return watermarked
// }

// import sharp from "sharp";

export async function addWatermark(buffer: ArrayBuffer, settings?: {
  enabled?: boolean,
  text?: string,
  opacity?: number,
  fontSize?: number,
  position?: string
}) {
  console.log("addWatermark вызвана!")
  console.log("Размер файла:", buffer.byteLength)
  console.log("Настройки водяного знака:", settings)


  // пока просто возвращаем оригинальный файл
  return buffer
}