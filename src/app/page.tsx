import ImageSlider from "@/components/ImageSlider";
import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{category: string}>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className=''>
      <div className="relative aspect-[3/1] md-12">
        <ImageSlider />
      </div>
      <ProductList category={category} params="homepage" />
    </div>
  )
}

export default Homepage