"use client";

import {
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

export default function ShareButtons({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
    if(typeof window === "undefined") return null;
  const url = `${window.location.origin}/blog/details/${id}`;

  return (
    <div className="flex gap-2">
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={20} round />
      </WhatsappShareButton>

      <EmailShareButton
        url={url}
        subject={title}
        body={`Check out this blog: ${url}`}
      >
        <EmailIcon size={20} round />
      </EmailShareButton>
    </div>
  );
}