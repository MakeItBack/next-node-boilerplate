import { useRef, useState } from "react";

export default function Modal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  modalRef.current?.showModal();

  function closeModal(e: any) {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }

  return (
    <dialog ref={modalRef} className="mx-auto my-auto p-16 text-center dialog-backdrop ">
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button onClick={closeModal}>OK</button>
      </form>
    </dialog>
  );
}
