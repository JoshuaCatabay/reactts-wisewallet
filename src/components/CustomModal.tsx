import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

export default function CustomModal({
  show,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
}: Props) {
  return (
    <Modal show={show} onHide={onClose} centered>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>

        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
