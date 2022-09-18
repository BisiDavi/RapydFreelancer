import Tabs from "@/components/tab";
import Button from "@/components/UI/Button";
import { formatCategory, getCountry, getDays } from "@/lib/fomatData";
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
    <li className="w-full justify-between flex items-center bg-gray-100 my-2">
      <div className="left">
        <p>Name: {item.name}</p>
        <p>category: {item?.category}</p>
        <p>image: {item?.image}</p>
        {item.country && <p>Country: {getCountry(item.country)}</p>}
        <p>
          currencies:
          {item.currencies.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
        <p>Is Refundable: {item?.is_refundable}</p>
        <p>Expires At: {getDays(item?.maximum_expiration_seconds)}</p>
        {item.amount_range_per_currency.map((item, index) => {
          return (
            <div key={index} className="">
              <p>
                Maximum Amount:
                {item?.maximum_amount
                  ? `${item?.maximum_amount} ${item.currency}`
                  : null}
              </p>
              <p>
                Minimum Amount:{" "}
                {item?.minimum_amount
                  ? `${item?.minimum_amount} ${item.currency}`
                  : null}
              </p>
            </div>
          );
        })}
      </div>
      <Button
        text={`Make Payment via ${item.name}`}
        className="bg-blue-500 mx-auto flex my-4 px-3 py-1.5 font-bold rounded-lg text-white hover:bg-blue-800"
      />
    </li>
  );
}

type tabGroupType = Props & {
  category: string;
};

function TabGroup({ category, paymentMethod }: tabGroupType) {
  const result = paymentMethod.filter((item) => item.category === category);
  return (
    <ul>
      {result.map((item: paymentMethodType, index: number) => (
        <TabItem key={index} item={item} />
      ))}
    </ul>
  );
}
