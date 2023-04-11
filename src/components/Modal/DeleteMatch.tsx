type DeleteMatchModalProps = {
  id: number;
  onDeleteMatch: (id: number) => void;
  homeTeam: string;
  awayTeam: string;
};

const DeleteMatchModal = ({
  id,
  onDeleteMatch,
  homeTeam,
  awayTeam,
}: DeleteMatchModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        id={`delete-modal-${id}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-neutral-focus">
          <h3 className="text-lg font-bold">Delete this match</h3>
          <p className="py-4">
            Are you sure you want to delete the match between {homeTeam} and{" "}
            {awayTeam}?
          </p>
          <p className="">
            You won&apos;t be able to undo this, and you&apos;ll have to
            recreate this match.
          </p>
          <div className="modal-action">
            <label
              htmlFor={`delete-modal-${id}`}
              className="btn-error btn text-error-content hover:bg-error-content hover:text-error"
              onClick={() => {
                onDeleteMatch(id);
              }}
            >
              Yes, I&apos;m sure
            </label>
            <label
              htmlFor={`delete-modal-${id}`}
              className="btn-warning btn text-warning-content hover:bg-warning-content hover:text-warning"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteMatchModal;
