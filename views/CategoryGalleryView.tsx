import Image from "next/image";

import categoryGalleryArray from "@/json/category-gallery.json";

export default function CategoryGalleryView() {
  return (
    <section className="px-4 lg:px-0">
      <h3 className="text-xl lg:text-3xl font-bold my-4">
        Hire Professionals with RapydFreelancer
      </h3>
      <div className="categorygalleryview my-4 lg:my-10 grid lg:grid-cols-4 grid-cols-2 gap-4">
        {categoryGalleryArray.map((categoryItem) => (
          <div
            key={categoryItem.image}
            className="image-view flex hover:bg-gray-900  flex-col relative justify-center items-center"
          >
            <div className="shadow-effect rounded-lg"></div>
            <Image
              src={categoryItem.image}
              alt={categoryItem.name}
              height={200}
              width={300}
              className="rounded-lg"
            />
            <span className="absolute mx-auto text-white justify-center items-center font-bold text-xl px-4 py-1">
              {categoryItem.name}
            </span>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .shadow-effect {
            height: 100%;
            width: 100%;
            display: none;
            background-color: black;
            opacity: 0.5;
          }
          .image-view {
            z-index: 10;
          }
          .image-view:hover .shadow-effect {
            position: absolute;
            display: flex;
            z-index: 20;
            left: 0px;
          }
          .image-view:hover span {
            display: flex;
          }
          .categorygalleryview span {
            border: 3px solid white;
            display: none;
            z-index: 30;
          }
        `}
      </style>
    </section>
  );
}
