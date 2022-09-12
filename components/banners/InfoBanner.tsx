import infoContent from "@/json/info.json";
import InfoCard from "@/components/card/InfoCard";

export default function InfoBanner() {
  return (
    <section className="flex  flex-col  my-6">
      <h3 className="text-left text-xl lg:text-3xl my-4 lg:my-10 font-medium ml-4">
        Need to get something done?
      </h3>
      <div className="flex flex-col lg:flex-row">
        {infoContent.map((infoItem) => (
          <InfoCard content={infoItem} key={infoItem.icon} />
        ))}
      </div>
      <hr className="border border-b mt-12" />
    </section>
  );
}
