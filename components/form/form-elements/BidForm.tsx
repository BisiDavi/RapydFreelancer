/* eslint-disable @next/next/no-img-element */
import ContentEditable from "react-contenteditable";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/UI/Button";
import Media from "@/components/form/form-elements/Media";
import useBidJob from "@/hooks/useBidJob";
import type { jobType } from "@/types";

interface Props {
  job: jobType;
}

export default function BidForm({ job }: Props) {
  const [previewMedia, setPreviewMedia] = useState([]);
  const [html, setHtml] = useState(
    "Get started with your <b>Proposal</b> here !"
  );

  const { createBid, auth } = useBidJob();

  function handleChange(e: any) {
    setHtml(e.target.value);
  }

  const previewClassname =
    previewMedia.length > 1 ? "grid grid-cols-2 gap-4" : "flex";

  const words = html.length > 0 ? html.split(" ") : [];
  const wordCount = words.length > 1 ? "words" : "word";

  function createBidHandler() {
    if (auth?.providerData[0].email === job.user.email) {
      return toast.error(
        "You posted this job, you can't bid on the job you posted"
      );
    }
    if (words.length > 50) {
      createBid(html, job);
    } else {
      toast.error(
        "Your Proposal is important and it must be at least 50 words"
      );
    }
  }

  return (
    <>
      <div className="proposal-view my-4 mb-8">
        <ContentEditable
          className="w-full border p-4 border-blue-500 rounded-xl h-400"
          html={html}
          onChange={handleChange}
        />
        <span className="font-bold">
          {words.length} {wordCount}
        </span>
      </div>
      {words.length >= 50 && (
        <Media
          big
          previewMedia={previewMedia}
          setPreviewMedia={setPreviewMedia}
          content={{
            name: "media",
            placeholder: "Attach document (optional)",
            label: "Upload a document (docs/pdf/picture) - (optional)",
            type: "media",
            elementType: "media",
          }}
        />
      )}
      {previewMedia.length > 0 && (
        <div className={`attached-document ${previewClassname}`}>
          {previewMedia.map((item, index) => (
            <img key={index} src={item} alt="preview attached documents" />
          ))}
        </div>
      )}
      <Button
        text="Submit"
        className="bg-green-600 text-white mt-8 w-24 h-10 mx-auto justify-center items-center flex hover:bg-green-400 font-bold"
        onClick={createBidHandler}
      />
    </>
  );
}