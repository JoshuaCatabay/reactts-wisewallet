import { useState } from "react";

export function useModal() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<React.ReactNode>(null);

  const open = (title: string, content: React.ReactNode) => {
    setTitle(title);
    setContent(content);
    setShow(true);
  };

  const close = () => setShow(false);

  return {
    show,
    title,
    content,
    open,
    close,
  };
}
