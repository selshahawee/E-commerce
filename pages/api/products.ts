// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import { GoogleSheetsDataRes } from 'types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )

  extractSheets(
    {
      // your google spreadsheet key
      spreadsheetKey: process.env.SHEET_KEY,
      // your google oauth2 credentials or API_KEY
      credentials,
      // optional: names of the sheets you want to extract
      sheetsToExtract: ['Products','Categories','Variants','Images'],
    },
    function (err: any, data: GoogleSheetsDataRes) {
      const products = data.Products.map((product) => {
        const images = data.Images.filter(
          (image) => image.productId === product.id
        )
        const variants = data.Variants.filter(
          (variant) => variant.productId === product.id
        )
        const category = data.Categories.find(
          (category) => category.id === product.categoriesId
        )
        return { ...product, images, variants, category }
      })

     
      res.status(200).json({ products })
    }
  )
}
