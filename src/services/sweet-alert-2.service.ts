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

interface DrawOfferSentOptions {
  width?: string | number;
}

export const showDrawOfferSentMessage = async ({
  width = 300,
}: DrawOfferSentOptions = {}) => {
  await toast.fire({
    title: `Draw offer sent`,
    icon: 'success',
    showCancelButton: false,
    showConfirmButton: false,
    showCloseButton: true,
    timer: 2000,
    width,
  });
};

interface DrawOfferMessageReceivedOptions {
  player: string;
  width?: string | number;
}

export const showDrawOfferReceivedMessage = async ({
  player,
  width = 300,
}: DrawOfferMessageReceivedOptions) => {
  const result = await toast.fire({
    title: `${player} offered you a draw`,
    confirmButtonText: 'Accept',
    confirmButtonColor: 'rgba(16, 185, 129, 1)',
    width,
  });
  return result.isConfirmed;
};

interface DrawOfferDeclinedMessageOptions {
  player: string;
  width?: string | number;
}

export const showDrawOfferDeclinedMessage = async ({
  player,
  width = 300,
}: DrawOfferDeclinedMessageOptions) => {
  await toast.fire({
    title: `${player} declined your draw offer`,
    icon: 'info',
    showCancelButton: false,
    showConfirmButton: false,
    showCloseButton: true,
    timer: 2000,
    width,
  });
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

export const showEmailSentMessage = async () => {
  await Swal.fire({
    toast: true,
    position: 'bottom-start',
    willOpen(toastEl) {
      toastEl.style.boxShadow = 'none';
    },
    timer: 3000,
    showConfirmButton: false,
    icon: 'success',
    title: 'Email Sent',
    text: 'Thanks for contacting us. Have a nice day!',
  });
};
