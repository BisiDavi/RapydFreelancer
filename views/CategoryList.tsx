import categoryListArray from "@/json/job-categories.json";
import displayCategoryIcons from "@/lib/displayCategoryIcons";

export default function CategoryList() {
  return (
    <>
      <div className="categorylist grid grid-cols-5">
        {categoryListArray.map((categoryItem) => {
          return (
            <ul key={categoryItem.link}>
              <li className="font-bold text-lg my-1">{categoryItem.name}</li>
              {categoryItem.group.map((item) => (
                <li key={item} className="flex items-center my-2 text-blue-500">
                  <span className="mr-1 text-xl">{displayCategoryIcons(item)}</span>
                  {item}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
      <style jsx>
        {`
          .categorylist {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
          }
        `}
      </style>
    </>
  );
}
