import Swal from 'sweetalert2';

const toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: true,
  showCancelButton: true,
  willOpen(toastEl) {
    const actions = toast.getActions();
    if (actions) {
      actions.style.flexDirection = 'row-reverse';
      actions.style.justifyContent = 'center';
    }
    toastEl.style.boxShadow = 'none';
  },
});

interface DrawOfferMessageOptions {
  player: string;
  width?: string | number;
}

export const showDrawOfferMessage = async ({
  player,
  width = 300,
}: DrawOfferMessageOptions) => {
  const result = await toast.fire({
    title: `${player} offered you a draw`,
    confirmButtonText: 'Accept',
    confirmButtonColor: 'rgba(16, 185, 129, 1)',
    width,
  });
  return result.isConfirmed;
};

interface ConfirmResignationOptions {
  width?: string | number;
}

export const showConfirmResignation = async ({
  width = 300,
}: ConfirmResignationOptions = {}) => {
  const result = await toast.fire({
    title: `Are you sure you want to resign?`,
    confirmButtonText: 'Resign',
    confirmButtonColor: 'rgba(239, 68, 68, 1)',
    width,
  });
  return result.isConfirmed;
};
