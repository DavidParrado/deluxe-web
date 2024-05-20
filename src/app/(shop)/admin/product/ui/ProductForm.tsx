"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage, Spinner } from "@/components";
import { Category, Gender, Product } from "@/interfaces";
import { ProductImage as ProductImageInterface } from "@/interfaces";
import { isValidGender } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageInterface[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];


interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Gender;
  categoryId: string;

  // todo: images
  images?: FileList;
}

const schema: ZodType<FormInputs> = z.object({
  title: z.string().min(1,"Campo requerido"),
  slug: z.string().min(1,"Campo requerido"),
  description: z.string(),
  price: z.coerce.number({ message: "Debes ingresar un numero" }).min(1, "Debe ser mayor a 1"),
  inStock: z.coerce.number({ message: "Debes ingresar un numero" }).min(1, "Debe ser mayor a 1"),
  sizes: z.custom<string[]>((val:string[]) => val.length > 0,"Debes seleccionar una talla"),
  tags: z.string().min(1,"Campo requerido"),
  gender: z.custom<Gender>((val: string) => isValidGender(val),"Debes seleccionar un genero"),
  categoryId: z.string().min(1,"Debes seleccionar una categoria"),
  images: z.optional(z.any())
})

export const ProductForm = ({ product, categories }: Props) => {

  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, formState: { isValid, errors }, getValues, setValue, watch } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],

      // Todo: images
      images: undefined
    },
    resolver: zodResolver(schema)
  });

  watch('sizes');

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from(sizes))
  }

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);

    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append('id', product.id ?? '');
    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    if (!ok) {
      setIsLoading(false);
      alert('Producto no se pudo actualizar')
      return;
    }

    setIsLoading(false);
    router.replace(`/admin/product/${updatedProduct?.slug}`)
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border rounded-md bg-white" {...register('title', { required: true })} />
          {errors.title && (<span className="text-red-500">{errors.title.message}</span>)}
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-white" {...register('slug', { required: true })} />
          {errors.slug && (<span className="text-red-500">{errors.slug.message}</span>)}
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-white"
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && (<span className="text-red-500">{errors.description.message}</span>)}
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-white" {...register('price', { required: true, min: 0 })} />
          {errors.price && (<span className="text-red-500">{errors.price.message}</span>)}
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-white" {...register('tags', { required: true })} />
          {errors.tags && (<span className="text-red-500">{errors.tags.message}</span>)}
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-white" {...register('gender', { required: true })}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
          </select>
          {errors.gender && (<span className="text-red-500">{errors.gender.message}</span>)}
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-white" {...register('categoryId', { required: true })}>
            <option value="">[Seleccione]</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
          {errors.categoryId && (<span className="text-red-500">{errors.categoryId.message}</span>)}
        </div>

        <button className="w-fit bg-black text-white py-3 px-5 flex items-center gap-2 cursor-pointer mt-4 hover:bg-slate-800 transition-colors duration-300">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-white"
            {...register('inStock', { required: true, min: 0 })}
          />
          {errors.inStock && (<span className="text-red-500">{errors.inStock.message}</span>)}
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">

            {
              sizes.map(size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div
                  key={size}
                  onClick={() => onSizeChanged(size)}
                  className={`p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center ${getValues('sizes').includes(size) ? 'bg-blue-500 text-white' : ''}`}
                >
                  <span>{size}</span>
                </div>
              ))
            }
            {errors.sizes && (<span className="text-red-500">{errors.sizes.message}</span>)}

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-white"
              accept="image/png, image/jpeg, image/avif"
              {...register('images')}
            />
            {errors.images && (<span className="text-red-500">{errors.images.message}</span>)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {
              product.ProductImage?.map(image => (
                <div key={image.id}>
                  <ProductImage
                    alt={product.title ?? ''}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded-t shadow-md"
                  />

                  <button
                    type="button"
                    onClick={async () => await deleteProductImage(image.id, image.url)}
                    className="bg-red-600 text-white rounded-b-sm w-full"
                  >
                    Eliminar
                  </button>

                </div>
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};