import dynamic from "next/dynamic";

import JobBanner from "@/components/banners/JobBanner";
import { useAppSelector } from "@/hooks/useRedux";
import DefaultLayout from "@/layout/DefaultLayout";
import JobsView from "@/views/JobsView";

const DynamicFooterAlert = dynamic(
  () =>
    import(
      /* webpackChunkName: 'FooterAlert' */ "@/components/alerts/FooterAlert"
    )
);

export default function Jobs() {
  const { showFooterAlert } = useAppSelector((state) => state.layout);
  return (
    <DefaultLayout title="Apply for Jobs, get it Done and get Paid.">
      <JobBanner />
      <JobsView />
      {showFooterAlert && <DynamicFooterAlert />}
    </DefaultLayout>
  );
}
