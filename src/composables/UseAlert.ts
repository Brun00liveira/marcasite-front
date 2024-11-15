
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export const useAlert = () => {
  const router = useRouter();

  const showSuccessAlert = (message: string, redirectTo: string) => {

    Swal.fire({
      icon: "success",
      title: message,
      text: "Você será redirecionado para a próxima página.",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    setTimeout(() => {
      router.push(redirectTo);
    }, 1000);
  };

  const showErrorAlert = (errorMessage: string) => {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: errorMessage,
    });
  };

  return {
    showSuccessAlert,
    showErrorAlert,
  };
};
