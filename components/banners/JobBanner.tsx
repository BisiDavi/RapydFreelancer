import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";

export default function JobBanner() {
  return (
    <div className="w-full bg-blue-500 h-24 flex items-center">
      <Container className="items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Top Jobs</h1>
        <Button
          text="Hire Freelancers"
          className="border border-white text-white px-3 py-1 hover:bg-white hover:text-blue-500"
        />
      </Container>
    </div>
  );
}
