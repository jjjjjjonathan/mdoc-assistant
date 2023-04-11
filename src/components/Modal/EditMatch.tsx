type EditMatchModalProps = {
  id: number;
};

const EditMatchModal = ({ id }: EditMatchModalProps) => {
  return (
    <>
      <input type="checkbox" id={`edit-modal-${id}`} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-neutral-focus">
          <h3 className="text-lg font-bold">EDIT MODAL for {id}</h3>
          <p className="py-4">
            You&apos;ve been selected for a chance to get one year of
            subscription to use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor={`edit-modal-${id}`} className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMatchModal;
