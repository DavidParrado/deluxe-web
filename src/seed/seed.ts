import bcryptjs from "bcryptjs";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Category;
}

interface SeedUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
}

export type Category = "men" | "women" | "kid";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "camisetas" | "pantalones" | "zapatos" | "hats";

interface SeedData {
  products: SeedProduct[];
  categories: string[];
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "juandparrado04@gmail.com",
      firstName: "Admin",
      lastName: "Prueba",
      password: bcryptjs.hashSync("123456"),
      role: "admin",
    },
    {
      email: "fernando@gmail.com",
      firstName: "Fernando",
      lastName: "Prueba",
      password: bcryptjs.hashSync("123456"),
      role: "user",
    },
  ],
  categories: ["Camisetas", "Pantalones", "Zapatos"],
  products: [
    {
      // name: "Artem Bondarchuk", // title
      price: 200,
      description:
        "Elegant and durable, this product is designed to bring a touch of class to your everyday life. Made from premium materials for lasting quality.",
      images: ["artem-bondarchuk-XPBYi4K8vFI-unsplash.png"],
      inStock: 10,
      sizes: ["S", "M", "L", "XL"],
      slug: "artem_bondarchuk_product",
      type: "zapatos",
      tags: ["elegant", "premium"],
      title: "Elegant Artem Bondarchuk",
      gender: "men",
    },
    {
      // name: "Barrett Ward", // title
      price: 200,
      description:
        "A stylish and functional addition to your wardrobe. This product offers both comfort and sophistication in any setting.",
      images: ["barrett-ward-cOJgO4Zzs-w-unsplash.png"],
      inStock: 15,
      sizes: ["M", "L", "XL"],
      slug: "barrett_ward_product",
      type: "zapatos",
      tags: ["stylish", "comfortable"],
      title: "Stylish Barrett Ward",
      gender: "men",
    },
    {
      // name: "Brad Starkey", // title
      price: 200,
      description:
        "Crafted for the modern individual, this product combines practicality with a sleek design. Perfect for daily use or special occasions.",
      images: ["brad-starkey-Bowrbqz1kgw-unsplash.png"],
      inStock: 20,
      sizes: ["S", "M", "L"],
      slug: "brad_starkey_product",
      type: "zapatos",
      tags: ["modern", "practical"],
      title: "Modern Brad Starkey",
      gender: "men",
    },
    {
      // name: "Branislav Belko", // title
      price: 200,
      description:
        "Experience unmatched comfort and style with this exclusive product. Designed to meet the highest standards of quality.",
      images: ["branislav-belko-lJ7iAZxplpc-unsplash.png"],
      inStock: 5,
      sizes: ["M", "L", "XL"],
      slug: "branislav_belko_product",
      type: "zapatos",
      tags: ["comfortable", "exclusive"],
      title: "Exclusive Branislav Belko",
      gender: "women",
    },
    {
      // name: "Daniel Storek-JM", // title
      price: 200,
      description:
        "A must-have for any fashion enthusiast, this product combines timeless design with contemporary flair.",
      images: ["daniel-storek-JM-qKEd1GMI-unsplash.png"],
      inStock: 12,
      sizes: ["S", "M", "L", "XL"],
      slug: "daniel_storek_jm_product",
      type: "zapatos",
      tags: ["fashion", "timeless"],
      title: "Timeless Daniel Storek-JM",
      gender: "men",
    },
    {
      // name: "Domino Studio", // title
      price: 200,
      description:
        "Add a touch of elegance to your collection with this finely crafted product, designed for both functionality and style.",
      images: ["domino-studio-164_6wVEHfI-unsplash.png"],
      inStock: 8,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "domino_studio_product",
      type: "zapatos",
      tags: ["elegant", "functional"],
      title: "Elegant Domino Studio",
      gender: "men",
    },
    {
      // name: "Ervan M-wirawan", // title
      price: 200,
      description:
        "This product offers a unique blend of style and comfort, making it a perfect choice for any occasion.",
      images: ["ervan-m-wirawan-6r280_Z7Efc-unsplash.png"],
      inStock: 18,
      sizes: ["S", "M", "L"],
      slug: "ervan_m_wirawan_product",
      type: "zapatos",
      tags: ["unique", "comfortable"],
      title: "Stylish Ervan M-wirawan",
      gender: "men",
    },
    {
      // name: "Ervan M-wirawan", // title
      price: 200,
      description:
        "Designed to provide superior comfort and style, this product is a great addition to any wardrobe.",
      images: ["ervan-m-wirawan-tgdgb6yb0Qo-unsplash.png"],
      inStock: 25,
      sizes: ["M", "L", "XL"],
      slug: "ervan_m_wirawan_product_2",
      type: "zapatos",
      tags: ["superior", "comfortable"],
      title: "Comfortable Ervan M-wirawan",
      gender: "women",
    },
    {
      // name: "Hermes Rivera", // title
      price: 200,
      description:
        "A versatile product that combines elegance with practicality, ideal for both casual and formal settings.",
      images: ["hermes-rivera-w83s82yd3Fk-unsplash.png"],
      inStock: 10,
      sizes: ["S", "M", "L"],
      slug: "hermes_rivera_product",
      type: "zapatos",
      tags: ["versatile", "elegant"],
      title: "Versatile Hermes Rivera",
      gender: "men",
    },
    {
      // name: "Hermes Rivera", // title
      price: 200,
      description:
        "This product stands out with its modern design and high-quality materials, perfect for those who value style.",
      images: ["hermes-rivera-wz_eb7K2Ip8-unsplash.png"],
      inStock: 22,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "hermes_rivera_product_2",
      type: "zapatos",
      tags: ["modern", "high-quality"],
      title: "Modern Hermes Rivera",
      gender: "men",
    },
    {
      // name: "Hipkicks", // title
      price: 200,
      description:
        "Crafted with attention to detail, this product offers a perfect blend of functionality and style for everyday use.",
      images: ["hipkicks-HcqA34-uWo4-unsplash.png"],
      inStock: 30,
      sizes: ["S", "M", "L", "XL"],
      slug: "hipkicks_product",
      type: "zapatos",
      tags: ["detailed", "functional"],
      title: "Functional Hipkicks",
      gender: "women",
    },
    {
      // name: "Imani Bahati", // title
      price: 200,
      description:
        "This product is designed to provide unmatched comfort and durability, making it a perfect choice for everyday wear.",
      images: ["imani-bahati-LxVxPA1LOVM-unsplash.png"],
      inStock: 15,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "imani_bahati_product",
      type: "zapatos",
      tags: ["comfortable", "durable"],
      title: "Durable Imani Bahati",
      gender: "women",
    },
    {
      // name: "Irene Kredenets", // title
      price: 200,
      description:
        "With its sleek design and high-quality materials, this product is perfect for those who appreciate fine craftsmanship.",
      images: ["irene-kredenets-dwKiHoqqxk8-unsplash.png"],
      inStock: 20,
      sizes: ["S", "M", "L"],
      slug: "irene_kredenets_product",
      type: "zapatos",
      tags: ["sleek", "high-quality"],
      title: "Sleek Irene Kredenets",
      gender: "women",
    },
    {
      // name: "Jeff Tumale", // title
      price: 200,
      description:
        "A premium product that combines elegance with practicality, designed for the modern individual.",
      images: ["jeff-tumale-SD9Jyl1xNQ4-unsplash.png"],
      inStock: 28,
      sizes: ["M", "L", "XL"],
      slug: "jeff_tumale_product",
      type: "zapatos",
      tags: ["premium", "elegant"],
      title: "Elegant Jeff Tumale",
      gender: "men",
    },
    {
      // name: "Lefteris Kallergis", // title
      price: 200,
      description:
        "This product offers a unique design and superior quality, making it an excellent choice for any fashion-forward individual.",
      images: ["lefteris-kallergis-j1GiPlvSGWI-unsplash.png"],
      inStock: 16,
      sizes: ["S", "M", "L", "XL"],
      slug: "lefteris_kallergis_product",
      type: "zapatos",
      tags: ["unique", "fashion"],
      title: "Fashionable Lefteris Kallergis",
      gender: "kid",
    },
    {
      // name: "Luis Felipe-lins", // title
      price: 200,
      description:
        "Designed to offer both comfort and style, this product is ideal for any occasion, from casual to formal.",
      images: ["luis-felipe-lins-LG88A2XgIXY-unsplash.png"],
      inStock: 14,
      sizes: ["M", "L", "XL"],
      slug: "luis_felipe_lins_product",
      type: "zapatos",
      tags: ["comfort", "style"],
      title: "Stylish Luis Felipe-lins",
      gender: "women",
    },
    {
      // name: "Maksim Larin", // title
      price: 200,
      description:
        "A versatile product that combines modern design with functionality, perfect for daily use.",
      images: ["maksim-larin-ezdrvzA1hZw-unsplash.png"],
      inStock: 19,
      sizes: ["S", "M", "L", "XL", "XXL"],
      slug: "maksim_larin_product",
      type: "zapatos",
      tags: ["versatile", "modern"],
      title: "Modern Maksim Larin",
      gender: "men",
    },
    {
      // name: "Malvestida", // title
      price: 200,
      description:
        "This product is designed to provide exceptional comfort and durability, making it perfect for everyday wear.",
      images: ["malvestida-DMl5gG0yWWY-unsplash.png"],
      inStock: 22,
      sizes: ["M", "L", "XL"],
      slug: "malvestida_product",
      type: "zapatos",
      tags: ["comfortable", "durable"],
      title: "Durable Malvestida",
      gender: "women",
    },
    {
      // name: "Matus Hatala", // title
      price: 200,
      description:
        "Experience superior comfort and style with this product, designed for those who value quality and elegance.",
      images: ["matus-hatala-pFzxaKhdFME-unsplash.png"],
      inStock: 11,
      sizes: ["S", "M", "L"],
      slug: "matus_hatala_product",
      type: "zapatos",
      tags: ["superior", "quality"],
      title: "Quality Matus Hatala",
      gender: "men",
    },
    {
      // name: "Mojtaba Mosayebzadeh", // title
      price: 200,
      description:
        "A stylish and practical product that offers both elegance and durability, suitable for any occasion.",
      images: ["mojtaba-mosayebzadeh-chmE8NgEAnk-unsplash.png"],
      inStock: 13,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "mojtaba_mosayebzadeh_product",
      type: "zapatos",
      tags: ["elegant", "durable"],
      title: "Durable Mojtaba Mosayebzadeh",
      gender: "men",
    },
    {
      // name: "Nelson Ndongala", // title
      price: 200,
      description:
        "This product stands out with its innovative design and high-quality materials, perfect for the modern individual.",
      images: ["nelson-ndongala-kKObh7tUPNc-unsplash.png"],
      inStock: 17,
      sizes: ["S", "M", "L"],
      slug: "nelson_ndongala_product",
      type: "zapatos",
      tags: ["innovative", "high-quality"],
      title: "Innovative Nelson Ndongala",
      gender: "men",
    },
    {
      // name: "Pat Kwon", // title
      price: 200,
      description:
        "A versatile and stylish product designed to offer both functionality and elegance, suitable for any setting.",
      images: ["pat-kwon-EJTjetc8tPs-unsplash.png"],
      inStock: 21,
      sizes: ["M", "L", "XL"],
      slug: "pat_kwon_product",
      type: "zapatos",
      tags: ["versatile", "elegant"],
      title: "Elegant Pat Kwon",
      gender: "women",
    },
    {
      // name: "Paul Gaudriault", // title
      price: 200,
      description:
        "Crafted with attention to detail, this product offers a perfect blend of style and practicality for everyday use.",
      images: ["paul-gaudriault-a-QH9MAAVNI-unsplash.png"],
      inStock: 26,
      sizes: ["S", "M", "L", "XL"],
      slug: "paul_gaudriault_product",
      type: "zapatos",
      tags: ["detailed", "practical"],
      title: "Detailed Paul Gaudriault",
      gender: "men",
    },
    {
      // name: "Pauline Figuet", // title
      price: 200,
      description:
        "A stylish product that combines elegance and functionality, designed for the modern fashion enthusiast.",
      images: ["pauline-figuet-15B-7t2-ssM-unsplash.png"],
      inStock: 9,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "pauline_figuet_product",
      type: "zapatos",
      tags: ["stylish", "functional"],
      title: "Functional Pauline Figuet",
      gender: "men",
    },
    {
      // name: "Ryan Plomp-jvoZ", // title
      price: 200,
      description:
        "Experience unmatched quality and comfort with this product, perfect for both casual and formal occasions.",
      images: ["ryan-plomp-jvoZ-Aux9aw-unsplash.png"],
      inStock: 23,
      sizes: ["S", "M", "L"],
      slug: "ryan_plomp_jvoz_product",
      type: "zapatos",
      tags: ["quality", "comfort"],
      title: "Comfortable Ryan Plomp-jvoZ",
      gender: "men",
    },
    {
      // name: "Taylor Smith", // title
      price: 200,
      description:
        "This product offers a unique design and high-quality craftsmanship, ideal for the discerning individual.",
      images: ["taylor-smith-aDZ5YIuedQg-unsplash.png"],
      inStock: 14,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "taylor_smith_product",
      type: "zapatos",
      tags: ["unique", "craftsmanship"],
      title: "Craftsmanship Taylor Smith",
      gender: "women",
    },
    {
      // name: "The Dk-photography", // title
      price: 200,
      description:
        "A versatile product that combines modern design with practical features, perfect for everyday use.",
      images: ["the-dk-photography-NUoPWImmjCU-unsplash.png"],
      inStock: 18,
      sizes: ["S", "M", "L"],
      slug: "the_dk_photography_product",
      type: "zapatos",
      tags: ["modern", "versatile"],
      title: "Versatile The Dk-photography",
      gender: "men",
    },
    {
      // name: "Usama Akram", // title
      price: 200,
      description:
        "Designed for comfort and style, this product is a great addition to any wardrobe, offering both elegance and practicality.",
      images: ["usama-akram-g3CMh2nqj_w-unsplash.png"],
      inStock: 10,
      sizes: ["M", "L", "XL"],
      slug: "usama_akram_product",
      type: "zapatos",
      tags: ["comfortable", "elegant"],
      title: "Elegant Usama Akram",
      gender: "men",
    },
    {
      // name: "Usama Akram", // title
      price: 200,
      description:
        "A high-quality product that combines modern design with superior craftsmanship, perfect for any occasion.",
      images: ["usama-akram-kP6knT7tjn4-unsplash.png"],
      inStock: 20,
      sizes: ["S", "M", "L"],
      slug: "usama_akram_product_2",
      type: "zapatos",
      tags: ["high-quality", "modern"],
      title: "Modern Usama Akram",
      gender: "men",
    },
    {
      // name: "Usama Akram", // title
      price: 200,
      description:
        "This product stands out with its elegant design and high-quality materials, perfect for those who appreciate fine craftsmanship.",
      images: ["usama-akram-s-gYAbQToXk-unsplash.png"],
      inStock: 5,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "usama_akram_product_3",
      type: "zapatos",
      tags: ["elegant", "craftsmanship"],
      title: "Craftsmanship Usama Akram",
      gender: "women",
    },
  ],
};
