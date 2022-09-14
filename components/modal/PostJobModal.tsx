/* eslint-disable @next/next/no-img-element */
import Modal from "@/components/modal";
import { modalStateType } from "@/types/redux-types";
import usePostJob from "@/hooks/usePostJob";
import { useAppDispatch } from "@/redux/store";
import { updateJobId } from "@/redux/form-slice";
import { useAppSelector } from "@/hooks/useRedux";
import {
  resetMedia,
  updateFormData,
  updateSelectedSkills,
} from "@/redux/form-slice";
import ConfirmJobList from "@/views/ConfirmJobList";

interface Props {
  modal: modalStateType | null;
  toggleModal: (modal: modalStateType) => void;
  methods: any;
}

export default function PostJobModal({ modal, toggleModal, methods }: Props) {
  const dispatch = useAppDispatch();
  const { useCreateJobMutation } = usePostJob();
  const { mutate, isSuccess , isLoading} = useCreateJobMutation();
  const { formData } = useAppSelector((state) => state.form);

  function postJobHandler() {
    dispatch(updateJobId());
    return mutate(formData, {
      onSuccess: () => {
        methods.reset();
        dispatch(resetMedia());
        dispatch(updateSelectedSkills([]));
        dispatch(updateFormData(null));
      },
    });
  }

  return (
    <>
      <Modal
        title="Review before posting Job"
        modal={modal}
        toggleModal={() => toggleModal(null)}
      >
        {formData !== null && (
          <ConfirmJobList
            toggleModal={toggleModal}
            postJobHandler={postJobHandler}
            isLoading={isLoading}
          />
        )}
        {isSuccess && (
          <div className="success flex mx-auto justify-center items-center">
            <img src="/checkmark.gif" alt="Job posted successfully" />
            <p className="text-center font-bold my-2">
              Job posted successfully, you can post more jobs or visit your
              admin to read freelancers proposals to your job listing
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
