/* eslint-disable @next/next/no-img-element */
import Modal from "@/components/modal";
import { skillType } from "@/types/form-types";
import { modalStateType } from "@/types/redux-types";
import ListElement, {
  ListElementMedia,
} from "@/components/form/form-elements/ListElement";
import Button from "@/components/UI/Button";
import usePostJob from "@/hooks/usePostJob";
import { useAppDispatch } from "@/redux/store";
import { updateJobId } from "@/redux/form-slice";

interface Props {
  modal: modalStateType | null;
  toggleModal: (modal: modalStateType) => void;
  methods: any;
}

export default function PostJobModal({ modal, toggleModal, methods }: Props) {
  const dispatch = useAppDispatch();
  const { useCreateJobMutation } = usePostJob();
  const { mutate, isLoading } = useCreateJobMutation();
  const data = methods.watch();

  console.log("data", data);

  function postJobHandler() {
    dispatch(updateJobId());
    return mutate(data, {
      onSuccess: () => {
        methods.reset();
      },
    });
  }

  return (
    <Modal
      title="Review before posting Job"
      modal={modal}
      toggleModal={toggleModal}
    >
      <ul className="flex flex-col">
        <h3 className="text-center text-lg font-bold">Job Listing Review</h3>
        <ListElement title="Title" value={data.title} />
        <ListElement title="Description" value={data.description} />
        <ListElement title="Period" value={data.duration.toLocaleLowerCase()} />
        <ListElement title="Price" value={`$${data.price}`} />
        <ListElement
          title="Rate"
          value={`$${data.price} (${data.pricePeriod.toLocaleLowerCase()})`}
        />
        <ListElement title="Skills" mapItem={data.skills} />
        <ListElementMedia title="Media" mapMedia={data.media} />

        <div className="button-Group flex items-center my-2 mt-4 justify-between w-2/3 justify-center mx-auto">
          <Button
            text="Cancel Job"
            className="bg-red-600 text-white w-24 h-10 hover:bg-red-400 font-bold"
            onClick={() => toggleModal(null)}
          />

          <Button
            text="Post Job"
            type="submit"
            className="bg-green-600 text-white w-24 h-10 mx-auto justify-center items-center flex hover:bg-green-400 font-bold"
            onClick={postJobHandler}
            loading={isLoading}
          />
        </div>
      </ul>
    </Modal>
  );
}
