import { Product } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"
import { ProductImage } from "../product/product-image/ProductImage"


const products = [
  { name: "Artem Bondarchuk", price: 200, description: "", imageUrl: "/products/artem-bondarchuk-XPBYi4K8vFI-unsplash.png" },
  { name: "Barrett Ward", price: 200, description: "", imageUrl: "/products/barrett-ward-cOJgO4Zzs-w-unsplash.png" },
  { name: "Brad Starkey", price: 200, description: "", imageUrl: "/products/brad-starkey-Bowrbqz1kgw-unsplash.png" },
  { name: "Branislav Belko", price: 200, description: "", imageUrl: "/products/branislav-belko-lJ7iAZxplpc-unsplash.png" },
  { name: "Daniel Storek-JM", price: 200, description: "", imageUrl: "/products/daniel-storek-JM-qKEd1GMI-unsplash.png" },
  { name: "Domino Studio", price: 200, description: "", imageUrl: "/products/domino-studio-164_6wVEHfI-unsplash.png" },
  { name: "Ervan M-wirawan", price: 200, description: "", imageUrl: "/products/ervan-m-wirawan-6r280_Z7Efc-unsplash.png" },
  { name: "Ervan M-wirawan", price: 200, description: "", imageUrl: "/products/ervan-m-wirawan-tgdgb6yb0Qo-unsplash.png" },
  { name: "Hermes Rivera", price: 200, description: "", imageUrl: "/products/hermes-rivera-w83s82yd3Fk-unsplash.png" },
  { name: "Hermes Rivera", price: 200, description: "", imageUrl: "/products/hermes-rivera-wz_eb7K2Ip8-unsplash.png" },
  { name: "Hipkicks", price: 200, description: "", imageUrl: "/products/hipkicks-HcqA34-uWo4-unsplash.png" },
  { name: "Imani Bahati", price: 200, description: "", imageUrl: "/products/imani-bahati-LxVxPA1LOVM-unsplash.png" },
  { name: "Irene Kredenets", price: 200, description: "", imageUrl: "/products/irene-kredenets-dwKiHoqqxk8-unsplash.png" },
  { name: "Jeff Tumale", price: 200, description: "", imageUrl: "/products/jeff-tumale-SD9Jyl1xNQ4-unsplash.png" },
  { name: "Lefteris Kallergis", price: 200, description: "", imageUrl: "/products/lefteris-kallergis-j1GiPlvSGWI-unsplash.png" },
  { name: "Luis Felipe-lins", price: 200, description: "", imageUrl: "/products/luis-felipe-lins-LG88A2XgIXY-unsplash.png" },
  { name: "Maksim Larin", price: 200, description: "", imageUrl: "/products/maksim-larin-ezdrvzA1hZw-unsplash.png" },
  { name: "Malvestida", price: 200, description: "", imageUrl: "/products/malvestida-DMl5gG0yWWY-unsplash.png" },
  { name: "Matus Hatala", price: 200, description: "", imageUrl: "/products/matus-hatala-pFzxaKhdFME-unsplash.png" },
  { name: "Mojtaba Mosayebzadeh", price: 200, description: "", imageUrl: "/products/mojtaba-mosayebzadeh-chmE8NgEAnk-unsplash.png" },
  { name: "Nelson Ndongala", price: 200, description: "", imageUrl: "/products/nelson-ndongala-kKObh7tUPNc-unsplash.png" },
  { name: "Pat Kwon", price: 200, description: "", imageUrl: "/products/pat-kwon-EJTjetc8tPs-unsplash.png" },
  { name: "Paul Gaudriault", price: 200, description: "", imageUrl: "/products/paul-gaudriault-a-QH9MAAVNI-unsplash.png" },
  { name: "Pauline Figuet", price: 200, description: "", imageUrl: "/products/pauline-figuet-15B-7t2-ssM-unsplash.png" },
  { name: "Ryan Plomp-jvoZ", price: 200, description: "", imageUrl: "/products/ryan-plomp-jvoZ-Aux9aw-unsplash.png" },
  { name: "Taylor Smith", price: 200, description: "", imageUrl: "/products/taylor-smith-aDZ5YIuedQg-unsplash.png" },
  { name: "The Dk-photography", price: 200, description: "", imageUrl: "/products/the-dk-photography-NUoPWImmjCU-unsplash.png" },
  { name: "Usama Akram", price: 200, description: "", imageUrl: "/products/usama-akram-g3CMh2nqj_w-unsplash.png" },
  { name: "Usama Akram", price: 200, description: "", imageUrl: "/products/usama-akram-kP6knT7tjn4-unsplash.png" },
  { name: "Usama Akram", price: 200, description: "", imageUrl: "/products/usama-akram-s-gYAbQToXk-unsplash.png" },
]

interface Props {
  products: Product[]
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="flex items-end justify-center mt-10">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">

        {
          products.map(product => (
            <div key={product.slug} className="bg-white rounded-lg border p-4">
              <Link href={`/product/${product.slug}`}>
                <ProductImage src={product.images[0]} alt="Placeholder Image" className="rounded-md object-cover w-full h-48 transition duration-300 ease-in-out hover:opacity-75" width={800} height={800} />
              </Link>

              <div className="px-1 py-4">
                <div className="text-lg mb-2">{product.title}</div>
                <p className="font-bold text-gray-900 text-base">
                  ${product.price}
                </p>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}
