/* eslint-disable @next/next/no-img-element */
import { memo } from "react";

import Tabs from "@/components/tab";
import Button from "@/components/UI/Button";
import usePaymentMutation from "@/hooks/usePaymentMutation";
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
      <TabGroupMemo key={item} category={item} paymentMethod={paymentMethod} />
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
  const { usePaymentRequiredFields } = usePaymentMutation();
  const { mutate } = usePaymentRequiredFields();

  function onClickHandler() {
    mutate(item.type, {
      onSuccess: (data) => {
        console.log("data-mutate", data?.data);
        if (data?.data.payment_method_options.length > 0) {
          const is3dsRequired = data?.data.payment_method_options.filter(
            (item: { name: string }) => item.name === "3d_required"
          )[0].is_required;
          const dataObj = is3dsRequired
            ? {
                payment_method: data?.data.fields,
                payment_method_options: {
                  "3d_required": true,
                },
              }
            : {
                payment_method: data?.data.fields,
              };
              
        } else {
        }
      },
    });
  }

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
            height="80px"
            width="80px"
            className="ml-2"
          />
        )}
        <Button
          text={`Make Payment via ${item.name}`}
          className="bg-blue-500 mx-auto text-sm flex my-4 px-3 py-1.5 font-bold rounded-lg text-white hover:bg-blue-800"
          onClick={onClickHandler}
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
  return (
    <ul>
      {result.map((item: paymentMethodType, index: number) => (
        <TabItem key={index} item={item} />
      ))}
    </ul>
  );
}

const TabGroupMemo = memo(TabGroup);
