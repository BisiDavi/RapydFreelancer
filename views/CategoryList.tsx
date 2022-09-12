import categoryListArray from "@/json/job-categories.json";
import displayCategoryIcons from "@/lib/displayCategoryIcons";

export default function CategoryList() {
  return (
    <section className="px-4 lg:px-0">
      <div className="categorylist grid lg:grid-cols-5 grid-cols-2 gap-4 my-4 mx-auto place-items-start">
        {categoryListArray.map((categoryItem) => {
          return (
            <ul key={categoryItem.link}>
              <li className="font-bold text-lg my-1">{categoryItem.name}</li>
              {categoryItem.group.map((item) => (
                <li key={item} className="flex items-center my-2 text-blue-500">
                  <span className="mr-1 text-xl">
                    {displayCategoryIcons(item)}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
}
