import JobBanner from "@/components/banners/JobBanner";
import DefaultLayout from "@/layout/DefaultLayout";
import JobsView from "@/views/JobsView";

export default function Jobs() {
  return (
    <DefaultLayout title="Apply for Jobs, get it Done and get Paid.">
      <JobBanner />
     <JobsView />
    </DefaultLayout>
  );
}
