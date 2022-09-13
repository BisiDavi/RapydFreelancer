import { GiCancel } from "react-icons/gi";

import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateFooterAlert } from "@/redux/layout-slice";

export default function FooterAlert() {
  const dispatch = useAppDispatch();

  function closeAlertHandler() {
    dispatch(updateFooterAlert());
  }

  return (
    <Container className="bg-gray-700 fixed bottom-0 h-28 lg:h-32 px-4 lg:px-0" full>
      <Container className="flex items-center justify-between">
        <div className="text">
          <h4 className="text-base lg:text-xl text-white font-bold my-2">
            Need to hire a freelancer for a job?
          </h4>
          <p className="text-white text-md">
            It&#39;s free to sign up, get started now
          </p>
        </div>
        <Button
          text="Post a Job"
          className="border border-white px-2 lg:px-4 py-1 lg:py-2 text-sm lg:text-xl font-bold bg-white hover:bg-black hover:text-white hover:border-black"
          href="/post-job"
        />
        <Button
          className="text-3xl absolute right-2 lg:right-4 top-1 lg:top-4 hover:text-red-500 text-white"
          type="button"
          icon={<GiCancel />}
          onClick={closeAlertHandler}
        />
      </Container>
    </Container>
  );
}
