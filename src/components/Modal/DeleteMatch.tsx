type DeleteMatchModalProps = {
  id: number;
};

const DeleteMatchModal = ({ id }: DeleteMatchModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        id={`delete-modal-${id}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-neutral-focus">
          <h3 className="text-lg font-bold">DELETE MODAL for {id}</h3>
          <p className="py-4">
            You&apos;ve been selected for a chance to get one year of
            subscription to use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor={`delete-modal-${id}`} className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteMatchModal;
