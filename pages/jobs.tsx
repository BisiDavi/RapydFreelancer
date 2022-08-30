import JobBanner from "@/components/banners/JobBanner";
import Container from "@/components/UI/Container";
import DefaultLayout from "@/layout/DefaultLayout";
import JobListView from "@/views/JobListView";

export default function Jobs() {
  return (
    <DefaultLayout title="Apply for Jobs, get it Done and get Paid.">
      <JobBanner />
      <Container className="flex-col bg-gray-200" full>
        <JobListView />
      </Container>
    </DefaultLayout>
  );
}
