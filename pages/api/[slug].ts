// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import { GoogleSheetsDataRes } from 'types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {slug} = req.query
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
          const oneProduct = data.Products.find((product) => product.slug === slug)
          if (!oneProduct) {
              return res.status(400).json({message: "product not found"})
          }

          const newProduct = { 
              ...oneProduct,
               images : data.Images.filter(
                (image) => image.productId === oneProduct.id
              ),
             variants : data.Variants.filter(
                (variant) => variant.productId === oneProduct.id
              ),
               category :  data.Categories.find(
                (category) => category.id === oneProduct.categoriesId
              )
              
          }
         
          res.status(200).json( newProduct )
      })

      
     
    }
