import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";

interface Props {
  title?: string;
  price?: number;
}

export default function JobBanner({ title, price }: Props) {
  const bannerTitle = title ? title : "Top Jobs";
  return (
    <div className="w-full bg-blue-500 h-24 flex items-center">
      <Container className="items-center justify-between px-4 lg:px-0">
        <h1 className="text-3xl font-bold text-white">{bannerTitle}</h1>
        {!title ? (
          <Button
            text="Hire Freelancers"
            className="border border-white text-white px-3 py-1 hover:bg-white hover:text-blue-500"
          />
        ) : (
          price && (
            <p className="text-white text-xl">
              Budget: <span className="font-bold">${price} </span>
            </p>
          )
        )}
      </Container>
    </div>
  );
}
