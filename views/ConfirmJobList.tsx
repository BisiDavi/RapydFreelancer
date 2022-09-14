/* eslint-disable @next/next/no-img-element */
import { modalStateType } from "@/types/redux-types";
import ListElement, {
  ListElementMedia,
} from "@/components/form/form-elements/ListElement";
import Button from "@/components/UI/Button";
import { useAppSelector } from "@/hooks/useRedux";

interface Props {
  isLoading: boolean;
  toggleModal: (modal: modalStateType) => void;
  postJobHandler: () => void;
}

export default function ConfirmJobList({
  toggleModal,
  postJobHandler,
  isLoading,
}: Props) {
  const { media, selectedSkills, formData } = useAppSelector(
    (state) => state.form
  );

  return (
    <>
      <ul className="flex flex-col -mt-4">
        <h3 className="text-center text-lg font-bold mb-2">
          Job Listing Review
        </h3>
        <ListElement title="Title" value={formData.title} />
        <ListElement title="Description" value={formData.description} />
        <ListElement
          title="Period"
          value={formData.duration.toLocaleLowerCase()}
        />
        <ListElement title="Price" value={`$${formData.price}`} />
        <ListElement
          title="Rate"
          value={`$${
            formData.price
          } (${formData.pricePeriod.toLocaleLowerCase()})`}
        />
        <ListElement title="Skills" mapItem={selectedSkills} />
        {media.length > 0 && (
          <ListElementMedia title="Media" mapMedia={media} />
        )}

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
    </>
  );
}
