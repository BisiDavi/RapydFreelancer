/* eslint-disable @next/next/no-img-element */
import Tabs from "@/components/tab";
import Button from "@/components/UI/Button";
import {
  formatCategory,
  formatCategoryIntoKey,
  getCountry,
  getDays,
} from "@/lib/fomatData";
import type { paymentMethodType } from "@/types";

interface Props {
  paymentMethod: paymentMethodType[];
}

export default function PaymentTab({ paymentMethod }: Props) {
  let categories: string[] = [];
  paymentMethod.map((item) => categories.push(formatCategory(item.category)));
  const uniqueCategorySet = new Set(categories);
  const uniqueCategory = Array.from(uniqueCategorySet);
  let tabBody: any = [];

  uniqueCategory.map((item) =>
    tabBody.push(
      <TabGroup key={item} category={item} paymentMethod={paymentMethod} />
    )
  );

  return (
    <div>
      <Tabs tabHeader={uniqueCategory} tabBody={tabBody} />
    </div>
  );
}

interface ItemProps {
  item: paymentMethodType;
}

function TabItem({ item }: ItemProps) {
  return (
    <li className="w-full justify-between flex items-center bg-gray-100 my-3 px-4 py-2 rounded">
      <div className="left">
        <p className="flex items-center">Name: {item.name}</p>
        <p>Category: {formatCategory(item.category)}</p>

        {item.country && <p>Country: {getCountry(item.country)}</p>}
        <p>
          Currencies:
          {item.currencies.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
        {item.is_refundable && (
          <p>Refundable: {item?.is_refundable ? "True" : "False"}</p>
        )}
        <p>Expires At: {getDays(item?.maximum_expiration_seconds)}</p>
        {item.amount_range_per_currency.map((item, index) => (
          <div key={index} className="">
            {item?.maximum_amount && (
              <p>
                Maximum Amount:
                {item?.maximum_amount
                  ? `${item?.maximum_amount} ${item.currency}`
                  : null}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="right flex flex-col items-end">
        {item.image && (
          <img
            src={item?.image}
            alt="icon"
            height="100px"
            width="100px"
            className="ml-2"
          />
        )}
        <Button
          text={`Make Payment via ${item.name}`}
          className="bg-blue-500 mx-auto flex my-4 px-3 py-1.5 font-bold rounded-lg text-white hover:bg-blue-800"
        />
      </div>
    </li>
  );
}

type tabGroupType = Props & {
  category: string;
};

function TabGroup({ category, paymentMethod }: tabGroupType) {
  const result = paymentMethod.filter(
    (item) => item.category === formatCategoryIntoKey(category)
  );
  console.log("result", result);
  console.log("category", category);
  return (
    <ul>
      {result.map((item: paymentMethodType, index: number) => (
        <TabItem key={index} item={item} />
      ))}
    </ul>
  );
}
