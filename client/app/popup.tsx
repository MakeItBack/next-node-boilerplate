export default function Modal() {
  return (
    <dialog open className="fixed top-1/3 left-1/3 bg-orange-300 p-16 text-center">
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
    </dialog>
  );
}
