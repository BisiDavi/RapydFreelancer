import DefaultLayout from "@/layout/DefaultLayout";

const asideArray = ["Profile", "Message", "Chat", "Settings"];

export default function UserPage() {
  return (
    <DefaultLayout title="Your Profile">
      <section className="container mx-auto my-10">
        <aside className="w-1/5 bg-gray-100 py-10 h-full">
          <ul>
            {asideArray.map((item) => (
              <li
                key={item}
                className="py-2 font-bold text-xl hover:bg-gray-400 my-2 px-4 hover:text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </DefaultLayout>
  );
}
