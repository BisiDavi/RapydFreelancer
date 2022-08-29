import infoContent from "@/json/info.json";
import InfoCard from "@/components/card/InfoCard";

export default function InfoBanner() {
  return (
    <section className="flex items-center my-6">
      {infoContent.map((infoItem) => (
        <InfoCard content={infoItem} key={infoItem.icon} />
      ))}
    </section>
  );
}
